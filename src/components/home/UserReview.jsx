import Review from "../Review"

const UserReview = () => {
    return (
        <div>
            <div className="text-center pb-10">
                <h1 className="font-bold text-4xl">User Reviews</h1>
            </div>
            <div className="flex justify-center items-center">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Review />
                    <Review />
                    <Review />
                    <Review />
                    <Review />
                    <Review />
                </div>
            </div>

        </div>
    )
}

export default UserReview