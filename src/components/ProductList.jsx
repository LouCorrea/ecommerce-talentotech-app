import { useState, useEffect }                                                  from 'react'
import { Card, Button, Row, Col, Alert, Spinner, Form, InputGroup, Pagination } from 'react-bootstrap'
import { Link }                                                                 from 'react-router-dom'
import { getProducts }                                                          from '../services/api'

function ProductList({ onAddToCart }) {
    const [filteredProducts, setFilteredProducts] = useState([])
    const [currentPage, setCurrentPage]           = useState(1)
    const [searchTerm, setSearchTerm]             = useState('')
    const [products, setProducts]                 = useState([])
    const [loading, setLoading]                   = useState(true)
    const [error, setError]                       = useState(null)

    const productsPerPage = 8

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts()
                setProducts(data)
                setFilteredProducts(data)
                setLoading(false)
            } catch (err) {
                setError('Error al cargar los productos. Por favor, intente más tarde.')
                setLoading(false)
            }
        }

        fetchProducts()
    }, [])

    useEffect(() => {
        const filtered = products.filter(product => {
            const productName = (product.name || product.title || '').toLowerCase();
            const productCategory = (product.category || '').toLowerCase();
            return productName.includes(searchTerm.toLowerCase()) ||
                   productCategory.includes(searchTerm.toLowerCase());
        });
        setFilteredProducts(filtered)
        setCurrentPage(1) 
    }, [searchTerm, products])

    const indexOfLastProduct = currentPage * productsPerPage
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage)

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    
    if (loading) {
        return (
            <div className="text-center">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </Spinner>
            </div>
        )
    }

    if (error) {
        return (
            <Alert variant="danger">
                {error}
            </Alert>
        )
    }

    return (
        <>
            <Row className="mb-4">
                <Col md={6} className="mx-auto">
                    <InputGroup size="lg">
                        <InputGroup.Text>
                            <i className="bi bi-search"></i>
                        </InputGroup.Text>
                        <Form.Control
                            type="text"
                            placeholder="Buscar productos..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            aria-label="Buscar productos"
                        />
                        {searchTerm && (
                            <Button 
                                variant="outline-secondary"
                                onClick={() => setSearchTerm('')}
                                aria-label="Limpiar búsqueda"
                            >
                                <i className="bi bi-x-lg"></i>
                            </Button>
                        )}
                    </InputGroup>
                    {searchTerm && (
                        <small className="text-muted d-block mt-2">
                            {filteredProducts.length} resultado(s) encontrado(s)
                        </small>
                    )}
                </Col>
            </Row>

            <Row className="g-4">
                {currentProducts.map(product => (
                    <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
                        <Card className="h-100 shadow-sm hover-shadow transition-all" style={{ transition: 'all 0.3s ease' }}>
                            <div className="position-relative">
                                <Card.Img
                                    variant="top"
                                    src={product.image}
                                    style={{
                                        height: '200px',
                                        objectFit: 'contain',
                                        padding: '1rem',
                                        backgroundColor: '#f8f9fa'
                                    }}
                                />
                                <span
                                    className="position-absolute top-0 end-0 m-2 badge bg-primary rounded-pill"
                                    style={{ fontSize: '0.9rem' }}
                                >
                                    ${product.price}
                                </span>
                            </div>
                            <Card.Body className="d-flex flex-column">
                                <Link
                                    to={`/product/${product.id}`}
                                    className="text-decoration-none"
                                >
                                    <Card.Title className="text-primary h5 mb-3" style={{ minHeight: '48px' }}>
                                        {product.name || product.title}
                                    </Card.Title>
                                    <Card.Text className="flex-grow-1 text-dark" style={{ fontSize: '0.9rem' }}>
                                        {product.description.substring(0, 80)}...
                                    </Card.Text>
                                </Link>
                                <div className="mt-auto pt-3 border-top">
                                    <Button
                                        variant="outline-primary"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            onAddToCart(product);
                                        }}
                                        className="w-100 d-flex align-items-center justify-content-center gap-2"
                                    >
                                        <i className="bi bi-cart-plus"></i>
                                        Agregar al carrito
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* Mensaje si no hay resultados */}
            {currentProducts.length === 0 && !loading && (
                <Row className="mt-4">
                    <Col>
                        <Alert variant="info" className="text-center">
                            <i className="bi bi-search me-2"></i>
                            No se encontraron productos que coincidan con tu búsqueda.
                        </Alert>
                    </Col>
                </Row>
            )}

            {totalPages > 1 && (
                <Row className="mt-4">
                    <Col className="d-flex justify-content-center">
                        <Pagination>
                            <Pagination.First 
                                onClick={() => handlePageChange(1)}
                                disabled={currentPage === 1}
                                aria-label="Primera página"
                            />
                            <Pagination.Prev 
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                aria-label="Página anterior"
                            />
                            
                            {[...Array(totalPages)].map((_, index) => {
                                const pageNumber = index + 1
                                if (
                                    pageNumber === 1 ||
                                    pageNumber === totalPages ||
                                    (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                                ) {
                                    return (
                                        <Pagination.Item
                                            key={pageNumber}
                                            active={pageNumber === currentPage}
                                            onClick={() => handlePageChange(pageNumber)}
                                            aria-label={`Página ${pageNumber}`}
                                            aria-current={pageNumber === currentPage ? 'page' : undefined}
                                        >
                                            {pageNumber}
                                        </Pagination.Item>
                                    )
                                } else if (
                                    pageNumber === currentPage - 2 ||
                                    pageNumber === currentPage + 2
                                ) {
                                    return <Pagination.Ellipsis key={pageNumber} disabled />
                                }
                                return null
                            })}
                            
                            <Pagination.Next 
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                aria-label="Página siguiente"
                            />
                            <Pagination.Last 
                                onClick={() => handlePageChange(totalPages)}
                                disabled={currentPage === totalPages}
                                aria-label="Última página"
                            />
                        </Pagination>
                    </Col>
                </Row>
            )}
        </>
    )
}

export default ProductList
