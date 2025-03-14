import { Col, Container, Button, Card, Row, Badge, Form } from "react-bootstrap";
import PageLayout from "./PageLayout";
import { useProducts, useProductsByCategory, Product } from "../queries/Products";
import useCategories from "../queries/Categories";
import { useState, useEffect } from "react";
import { addProduct } from "../redux/cartSlice";

const getCartFromSessionStorage = () => {
    const cartFromSessionStorage = sessionStorage.getItem("cart");
    return cartFromSessionStorage ? JSON.parse(cartFromSessionStorage) : [];
};

const setCartToSessionStorage = (cart: any[]) => {
    sessionStorage.setItem("cart", JSON.stringify(cart));
};


const HomePage: React.FC = () => {
    const [cart, setCart] = useState<Product[]>([]);
    
    const handleAddProduct = (product: Product, cart: Product[], setCart: React.Dispatch<React.SetStateAction<any[]>>) => {
        const updatedCart = [...cart, product];
        setCart(updatedCart);
        setCartToSessionStorage(updatedCart);
        addProduct(product);
    };

    useEffect(() => {
        const storedCart = getCartFromSessionStorage();
        setCart(storedCart);
    }, []);

    const { data: categories } = useCategories();
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    
    const { data: products, isLoading, error } = useProducts();
    const { data: filteredProducts, isLoading: isFiltering } = useProductsByCategory(selectedCategory);

    const displayProducts = selectedCategory ? filteredProducts : products;

    const handleFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(e.target.value);
    };

    return (
        <PageLayout>
            <Container fluid>
                <div className="my-3 bg-warning rounded p-5 text-white">
                    <h1>Welcome to STORE!</h1>
                    <p>A one-stop-shop for everything you need...</p>
                </div>
            </Container>

            <Container>
                <div className="my-3">
                    <h2 className="display-5 mb-3">Products</h2>

                    <Form.Select className="w-25 mb-3" onChange={handleFilter}>
                        <option value="">Filter by category</option>
                        {categories?.map((category, index) => (
                            <option key={index} value={category} style={{ textTransform: "capitalize" }}>{category}</option>
                        ))}
                    </Form.Select>

                    {isLoading || isFiltering && <p>Loading products...</p>}
                    {error && <p>Error occurred while fetching products</p>}

                    <Row>
                        {displayProducts?.map(product => (
                            <Col md={4} key={product.id} className="mb-4">
                                <Card className="h-100">
                                    <Card.Img style={{ objectFit: "contain", maxHeight: "250px" }} className="mt-3 h-25" variant="top" src={product.image} />
                                    <Card.Body className="d-flex flex-column">
                                        <Card.Text className="mb-2 text-secondary" style={{ textTransform: "capitalize" }}>{product.category}</Card.Text>
                                        <Card.Title className="mb-2">{product.title}</Card.Title>
                                        <Card.Text className="mb-2">{product.rating.rate}⭐ ({product.rating.count} Reviews)</Card.Text>
                                        <Card.Title className="mb-3"><Badge bg="warning">${product.price}</Badge></Card.Title>
                                        <Card.Text className="">{product.description}</Card.Text>
                                        <Button variant="warning" onClick={() => handleAddProduct(product, cart, setCart)} className="mt-auto">Add to cart</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            </Container>
        </PageLayout>
    );
};

export default HomePage;