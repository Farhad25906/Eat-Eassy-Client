

const SharedTitle = ({heading,subHeading}) => {
    return (
        <div className="mx-auto text-center w-9/12 my-8">
            <p className=" mb-2">---{subHeading}---</p>
            <h3 className="text-orange-500 text-4xl uppercase border-y-4 py-4">{heading}</h3>
        </div>
    );
};

export default SharedTitle;