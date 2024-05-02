function SkeletonCard() {
    const Skeleton = () => {
        return (
            <div className="card" aria-hidden="true">
                <div className="card-body">
                    <h5 className="card-title placeholder-glow">
                        <span className="placeholder col-6"></span>
                    </h5>
                    <p className="card-text placeholder-glow">
                        <span className="placeholder col-7"></span>
                        <span className="placeholder col-4"></span>
                        <span className="placeholder col-4"></span>
                        <span className="placeholder col-6"></span>
                        <span className="placeholder col-8"></span>
                    </p>
                    {/*<div className="placeholder-glow">*/}
                    {/*    <button className="btn btn-dark disabled placeholder col-12"></button>*/}
                    {/*</div>*/}
                </div>
            </div>
        )
    }



    return (
        <div>
            <Skeleton/>
        </div>

    );
}

export default SkeletonCard;
