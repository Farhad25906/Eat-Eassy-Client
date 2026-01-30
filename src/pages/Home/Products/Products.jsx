import SharedTitle from "../../../Components/Shared/Sharedtitle/SharedTitle"

const product1 = "https://i.ibb.co/zm726sw/sweets.png"
const product2 = "https://i.ibb.co/PhLDNhK/snacks-image.png"
const product3 = "https://i.ibb.co/q1f6Y5y/sabzis-and-dals-image.png"
const product4 = "https://i.ibb.co/KDBBcQk/Rice.png"
const product5 = "https://i.ibb.co/NS0fsQq/indian-breads-image.png"
const product6 = "https://i.ibb.co/935mc1Q/dals.png"

const Products = () => {
    return (
        <div>
             <SharedTitle heading="Best Food From Us" subHeading="Our Top Selling Foods"></SharedTitle>
            <div className="grid grid-cols-2 lg:grid-cols-6 p-5">
                <div className="text-center">
                    <img src={product1} alt="" />
                    <h6 className="text-xl text-orange-500 font-bold border-x-2 border-orange-500">Sweets</h6>
                </div>
                <div className="text-center">
                    <img src={product2} alt="" />
                    <h6 className="text-xl text-orange-500 font-bold border-x-2 border-orange-500">Snacks</h6>
                </div>
                <div className="text-center">
                    <img src={product3} alt="" />
                    <h6 className="text-xl text-orange-500 font-bold border-x-2 border-orange-500">Sabzis</h6>
                </div>
                <div className="text-center">
                    <img src={product4} alt="" />
                    <h6 className="text-xl text-orange-500 font-bold border-x-2 border-orange-500">Rice</h6>
                </div>
                <div className="text-center">
                    <img src={product5} alt="" />
                    <h6 className="text-xl text-orange-500 font-bold border-x-2 border-orange-500">Ruti</h6>
                </div>
                <div className="text-center">
                    <img src={product6} alt="" />
                    <h6 className="text-xl text-orange-500 font-bold border-x-2 border-orange-500">Dals</h6>
                </div>
            </div>
        </div>
    );
};

export default Products;