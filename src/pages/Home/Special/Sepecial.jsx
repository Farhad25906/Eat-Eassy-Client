import SharedTitle from "../../../Components/Shared/Sharedtitle/SharedTitle";
const img1 ="https://i.ibb.co/1YV0PWN/magicstudio-fy8b73.png"
const img2 ="https://i.ibb.co/fq5H86b/magicstudio-r0c64z.png"
const img3 ="https://i.ibb.co/r7DSbsN/magicstudio-6n1a4r.png"
const img4 ="https://i.ibb.co/6rKDkDN/magicstudio-noy4b8.png"



const Sepecial = () => {
    return (
        <div>
        <SharedTitle heading="What malkes us Special" subHeading="Our Specialities"></SharedTitle>
       <div className="grid grid-cols-1 lg:grid-cols-2 p-5 gap-5">
           <div className="flex flex-col items-center">
               <img src={img1} alt="" />
               <h6 className="mt-2 mb-2 text-2xl text-black font-bold uppercase">Save Money</h6>
               <p>Our Meals Are Budget Friendly For All Student And Teachers.</p>
           </div>
           <div className="flex flex-col items-center">
               <img src={img2} alt="" />
               <h6 className="mt-2 mb-2 text-2xl text-black font-bold">DELICIOUS Home FOods</h6>
               <p>We Are Commited To Providing You With The Comfort Of Home Cooking.</p>
           </div>
           <div className="flex flex-col items-center">
               <img src={img3} alt="" />
               <h6 className="mt-2 mb-2 text-2xl text-black font-bold">FAST TO COOK</h6>
               <p>Our Fast Chef Can Save Your Time Eassily</p>
           </div>
           <div className="flex flex-col items-center">
               <img src={img4} alt="" />
               <h6 className="mt-2 mb-2 text-2xl text-black font-bold">NO PRESERVATIVES</h6>
               <p>Our products are dry in form and have no preservatives at all.</p>
           </div>
          
       </div>
   </div>
    );
};

export default Sepecial;