import { useState, useEffect }          from 'react';
import { Form, Button, Card, Alert }    from 'react-bootstrap';
import { createProduct, updateProduct } from '../services/api';
import { toast }                        from 'react-toastify';

const initFormData = {
    title: '',
    price: '',
    description: '',
    image: '',
    category: '' 
}

function ProductForm({ product, onClose }) {
    const [imagePreview, setImagePreview] = useState('');
    const [formData, setFormData]         = useState(initFormData);
    const [loading, setLoading]           = useState(false);
    const [errors, setErrors]             = useState({});

    useEffect(() => {
        if (product) {
            setFormData({
                title: product.name || product.title || '',
                price: product.price || '',
                description: product.description || '',
                image: product.image || '',
                category: product.category || ''
            });
            setImagePreview(product.image || '');
        }
    }, [product]);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.title.trim()) {
            newErrors.title = 'El nombre es obligatorio';
        }

        if (!formData.price || parseFloat(formData.price) <= 0) {
            newErrors.price = 'El precio debe ser mayor a 0';
        }

        if (!formData.description.trim() || formData.description.length < 10) {
            newErrors.description = 'La descripción debe tener al menos 10 caracteres';
        }

        if (!formData.image.trim()) {
            newErrors.image = 'La imagen es obligatoria';
        }

        if (!formData.category.trim()) {
            newErrors.category = 'La categoría es obligatoria';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            toast.error('Por favor corrija los errores en el formulario', {
                position: "top-right",
                autoClose: 3000
            });
            return;
        }

        setLoading(true);
        try {
            const productData = {
                name: formData.title,  
                price: parseFloat(formData.price),
                description: formData.description,
                image: formData.image,
                category: formData.category
            };

            if (product) {
                await updateProduct(product.id, productData);
                toast.success('Producto actualizado exitosamente', { position: "top-right", autoClose: 2000 });
            } else {
                await createProduct(productData);
                toast.success('Producto creado exitosamente', { position: "top-right", autoClose: 2000 });
            }

            onClose();
        } catch (error) {
            console.error('Error saving product:', error);
            toast.error('Error al guardar el producto. Por favor intente nuevamente.', { position: "top-right", autoClose: 3000 });
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                setErrors(prev => ({
                    ...prev,
                    image: 'Por favor seleccione un archivo de imagen válido'
                }));
                return;
            }

            if (file.size > 5 * 1024 * 1024) {
                setErrors(prev => ({
                    ...prev,
                    image: 'La imagen no debe superar los 5MB'
                }));
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result;
                setFormData(prev => ({
                    ...prev,
                    image: base64String
                }));
                setImagePreview(base64String);
                setErrors(prev => ({
                    ...prev,
                    image: ''
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <Card className="shadow-sm">
            <Card.Body>
                <h4 className="mb-4">
                    {product ? 'Editar Producto' : 'Agregar Nuevo Producto'}
                </h4>

                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formTitle">
                        <Form.Label>
                            Nombre del Producto <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            isInvalid={!!errors.title}
                            placeholder="Ingrese el nombre del producto"
                            aria-required="true"
                            aria-label="Nombre del producto"
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.title}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPrice">
                        <Form.Label>
                            Precio <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            isInvalid={!!errors.price}
                            placeholder="0.00"
                            step="0.01"
                            min="0"
                            aria-required="true"
                            aria-label="Precio del producto"
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.price}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formDescription">
                        <Form.Label>
                            Descripción <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            isInvalid={!!errors.description}
                            placeholder="Mínimo 10 caracteres"
                            aria-required="true"
                            aria-label="Descripción del producto"
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.description}
                        </Form.Control.Feedback>
                        <Form.Text className="text-muted">
                            {formData.description.length} caracteres
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formImage">
                        <Form.Label>
                            Imagen del Producto <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            isInvalid={!!errors.image}
                            aria-required="true"
                            aria-label="Imagen del producto"
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.image}
                        </Form.Control.Feedback>
                        <Form.Text className="text-muted">
                            Formatos: JPG, PNG, GIF. Tamaño máximo: 5MB
                        </Form.Text>
                        
                        {imagePreview && (
                            <div className="mt-3 text-center">
                                <img 
                                    src={imagePreview} 
                                    alt="Vista previa" 
                                    style={{ 
                                        maxWidth: '200px', 
                                        maxHeight: '200px',
                                        objectFit: 'contain',
                                        border: '1px solid #dee2e6',
                                        borderRadius: '8px',
                                        padding: '10px'
                                    }}
                                />
                            </div>
                        )}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formCategory">
                        <Form.Label>
                            Categoría <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            type="text"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            isInvalid={!!errors.category}
                            placeholder="Ej: electrónica, ropa, etc."
                            aria-required="true"
                            aria-label="Categoría del producto"
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.category}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <div className="d-flex gap-2">
                        <Button 
                            variant="primary" 
                            type="submit" 
                            disabled={loading}
                            aria-label={product ? "Actualizar producto" : "Guardar producto"}
                        >
                            {loading ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    Guardando...
                                </>
                            ) : (
                                <>
                                    <i className="bi bi-check-circle me-2"></i>
                                    {product ? 'Actualizar' : 'Guardar'}
                                </>
                            )}
                        </Button>
                        <Button 
                            variant="secondary" 
                            onClick={onClose}
                            disabled={loading}
                            aria-label="Cancelar"
                        >
                            <i className="bi bi-x-circle me-2"></i>
                            Cancelar
                        </Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    );
}

export default ProductForm;
