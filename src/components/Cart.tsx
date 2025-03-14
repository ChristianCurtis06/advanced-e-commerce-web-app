import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Form, FloatingLabel, Button, Badge } from "react-bootstrap";
import PageLayout from "./PageLayout";
import { removeProduct } from "../redux/cartSlice";
import { Product } from "../queries/Products";

const getCartFromSessionStorage = () => {
    const cartFromSessionStorage = sessionStorage.getItem("cart");
    return cartFromSessionStorage ? JSON.parse(cartFromSessionStorage) : [];
};

const setCartToSessionStorage = (cart: any[]) => {
    sessionStorage.setItem("cart", JSON.stringify(cart));
};

const Cart: React.FC = () => {
    const [cart, setCart] = useState<Product[]>([]);
    const [productCount, setProductCount] = useState<number>(0);
    
    const calculateTotal = () => {
        let total: number = 0;
        for (let product of cart) {
            total += parseFloat(product.price);
        }
        return total;
    };

    const handleRemoveProduct = (productId: number, cart: Product[], setCart: React.Dispatch<React.SetStateAction<any[]>>) => {
        const updatedCart = cart.filter(product => product.id !== productId);
        setCart(updatedCart);
        setCartToSessionStorage(updatedCart);
        removeProduct(productId);
    };

    const handleCheckout = () => {
        setCart([]);
        sessionStorage.clear();
    };

    useEffect(() => {
        const storedCart = getCartFromSessionStorage();
        setCart(storedCart);
    }, []);

    useEffect(() => {
        setProductCount(cart.length);
    }, [cart]);

    return (
        <PageLayout>
            <Container>
                <div className="my-3">
                    <h2 className="display-5 mb-3">Cart</h2>
                </div>
            </Container>

            <Container>
                <div className="my-3 bg-light rounded p-5 text-white">
                    {cart.length > 1 || cart.length == 0 ? <p className="text-black">{productCount} Products in Cart</p> : <p className="text-black">{productCount} Product in Cart</p>}
                    {cart.map((product, index) => (
                        <Card key={index} className="mb-4">
                            <Row>
                                <Col md={2} className="d-flex justify-content-center align-items-center">
                                    <Card.Img style={{ objectFit: "contain", maxHeight: "150px" }} className="p-2" src={product.image} />
                                </Col>
                                <Col md={10}>
                                    <Card.Body className="d-flex flex-column h-100">
                                        <div className="d-flex flex-row">
                                            <Card.Title className="mb-2 fs-2">{product.title}</Card.Title>
                                            <Card.Title className="mb-3 ms-3 fs-2"><Badge bg="warning">${product.price}</Badge></Card.Title>
                                        </div>
                                        <Row className="">
                                            <Col md={3}>
                                                <FloatingLabel
                                                    controlId="floatingInput"
                                                    label="Quantity"
                                                >
                                                    <Form.Control type="number" /*value={cart.}*/ />
                                                </FloatingLabel>
                                            </Col>
                                            <Col md={9} className="mt-sm-2 mt-md-0">
                                                <Button variant="outline-warning" onClick={() => handleRemoveProduct(product.id, cart, setCart)} className="h-100 w-100 mt-auto">Remove from cart</Button>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Col>
                            </Row>
                        </Card>
                    ))}
                    <p className="display-6 text-black">Total: ${calculateTotal()}</p>
                    <Button variant="warning" onClick={() => handleCheckout()} className="h-100 w-100 mt-2">Checkout</Button>
                </div>
            </Container>
        </PageLayout>
    );
}

export default Cart;