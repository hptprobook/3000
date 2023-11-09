import { GetServerSideProps } from 'next';

const CartPage = () => {
    return (
        <div>
            CartPage
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {


    return {
        props:{

        }
    }
}

export default CartPage