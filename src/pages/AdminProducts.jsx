import { useState }                    from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import AdminProductList                from '../components/AdminProductList';
import ProductForm                     from '../components/ProductForm';

function AdminProducts() {
    const [showForm, setShowForm]             = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const handleAddProduct = () => {
        setEditingProduct(null);
        setShowForm(true);
    };

    const handleEditProduct = (product) => {
        setEditingProduct(product);
        setShowForm(true);
    };

    const handleFormClose = () => {
        setShowForm(false);
        setEditingProduct(null);
        setRefreshTrigger(prev => prev + 1);
    };

    return (
        <Container className="py-4">
            <Row className="mb-4">
                <Col>
                    <div className="d-flex justify-content-between align-items-center">
                        <h1>Administración de Productos</h1>
                        <Button 
                            variant="primary" 
                            onClick={handleAddProduct}
                            aria-label="Agregar nuevo producto"
                        >
                            <i className="bi bi-plus-circle me-2"></i>
                            Agregar Producto
                        </Button>
                    </div>
                </Col>
            </Row>

            {showForm && (
                <Row className="mb-4">
                    <Col>
                        <ProductForm 
                            product={editingProduct}
                            onClose={handleFormClose}
                        />
                    </Col>
                </Row>
            )}

            <Row>
                <Col>
                    <AdminProductList 
                        onEdit={handleEditProduct}
                        refreshTrigger={refreshTrigger}
                    />
                </Col>
            </Row>
        </Container>
    );
}

export default AdminProducts;
