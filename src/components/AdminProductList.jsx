import { useState, useEffect }                  from 'react';
import { Table, Button, Modal, Spinner, Alert } from 'react-bootstrap';
import { getMockProducts, deleteProduct }       from '../services/api';
import { toast }                                from 'react-toastify';

function AdminProductList({ onEdit, refreshTrigger }) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    const [products, setProducts]               = useState([]);
    const [loading, setLoading]                 = useState(true);
    const [error, setError]                     = useState(null);

    useEffect(() => {
        fetchProducts();
    }, [refreshTrigger]);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const data = await getMockProducts();
            setProducts(data);
            setError(null);
        } catch (err) {
            console.error('Error fetching products:', err);
            setError('Error al cargar los productos');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteClick = (product) => {
        setProductToDelete(product);
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = async () => {
        if (!productToDelete) return;

        try {
            await deleteProduct(productToDelete.id);
            toast.success(`${productToDelete.name} eliminado exitosamente`, { position: "top-right", autoClose: 2000 });
            setShowDeleteModal(false);
            setProductToDelete(null);
            fetchProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
            toast.error('Error al eliminar el producto', { position: "top-right", autoClose: 3000 });
        }
    };

    const handleDeleteCancel = () => {
        setShowDeleteModal(false);
        setProductToDelete(null);
    };

    if (loading) {
        return (
            <div className="text-center py-5">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Cargando productos...</span>
                </Spinner>
                <p className="mt-2">Cargando productos...</p>
            </div>
        );
    }

    if (error) {
        return (
            <Alert variant="danger" className="text-center">
                <i className="bi bi-exclamation-triangle me-2"></i>
                {error}
            </Alert>
        );
    }

    if (products.length === 0) {
        return (
            <Alert variant="info" className="text-center">
                <i className="bi bi-info-circle me-2"></i>
                No hay productos disponibles. ¡Agrega el primero!
            </Alert>
        );
    }

    return (
        <>
            <div className="table-responsive">
                <Table striped bordered hover className="shadow-sm">
                    <thead className="table-primary">
                        <tr>
                            <th>ID</th>
                            <th>Imagen</th>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Categoría</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>
                                    <img 
                                        src={product.image} 
                                        alt={product.name || product.title}
                                        style={{ 
                                            width: '50px', 
                                            height: '50px', 
                                            objectFit: 'contain' 
                                        }}
                                    />
                                </td>
                                <td>{product.name || product.title}</td>
                                <td>${parseFloat(product.price).toFixed(2)}</td>
                                <td>
                                    <span className="badge bg-secondary">
                                        {product.category}
                                    </span>
                                </td>
                                <td>
                                    <div className="d-flex gap-2">
                                        <Button
                                            variant="outline-primary"
                                            size="sm"
                                            onClick={() => onEdit(product)}
                                            aria-label={`Editar ${product.name || product.title}`}
                                        >
                                            <i className="bi bi-pencil"></i> Editar
                                        </Button>
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={() => handleDeleteClick(product)}
                                            aria-label={`Eliminar ${product.name || product.title}`}
                                        >
                                            <i className="bi bi-trash"></i> Eliminar
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>

            {/* Modal de Confirmación de Eliminación */}
            <Modal 
                show={showDeleteModal} 
                onHide={handleDeleteCancel}
                centered
                aria-labelledby="delete-modal-title"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="delete-modal-title">
                        <i className="bi bi-exclamation-triangle text-warning me-2"></i>
                        Confirmar Eliminación
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {productToDelete && (
                        <>
                            <p>¿Está seguro que desea eliminar el siguiente producto?</p>
                            <div className="alert alert-warning">
                                <strong>{productToDelete.name}</strong><br/>
                                <small>Esta acción no se puede deshacer.</small>
                            </div>
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button 
                        variant="secondary" 
                        onClick={handleDeleteCancel}
                        aria-label="Cancelar eliminación"
                    >
                        <i className="bi bi-x-circle me-2"></i>
                        Cancelar
                    </Button>
                    <Button 
                        variant="danger" 
                        onClick={handleDeleteConfirm}
                        aria-label="Confirmar eliminación"
                    >
                        <i className="bi bi-trash me-2"></i>
                        Eliminar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AdminProductList;
