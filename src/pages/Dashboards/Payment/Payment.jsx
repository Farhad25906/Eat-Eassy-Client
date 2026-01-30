import SharedTitle from "../../../Components/Shared/Sharedtitle/SharedTitle";
import { loadStripe } from '@stripe/stripe-js';
import { Elements} from '@stripe/react-stripe-js';
import CheckoutForm from "./CheckoutForm";


const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY);
const Payment = () => {
    return (
        <div>
            <SharedTitle heading="Payment" subHeading="Please Pay To Eat"></SharedTitle>
            <Elements stripe={stripePromise}>
                <CheckoutForm />
            </Elements>
        </div>
    );
};

export default Payment;