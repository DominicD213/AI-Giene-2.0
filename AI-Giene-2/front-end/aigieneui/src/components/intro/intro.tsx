import personalPhoto from '../../Assets/personalPhoto.png';

const Intro: React.FC = () => {
    return (
        <div className="m-auto text-center">
            {/* Image: Only visible on large screens (lg and up) */}
            <div className="relative w-[15rem] h-[15rem] m-auto hidden lg:block">
                <img 
                    className="w-full h-full object-cover rounded-full border-2 shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out" 
                    src={personalPhoto} 
                    alt="Dominic Digiacomo" 
                    style={{ borderColor: "white" }}
                />
            </div>

            {/* Text: Always visible */}
            <div className="mt-5">
                <h1 className="text-4xl font-bold" style={{color: "white"}} >Welcome to Giene!</h1>   
                <p className="text-white mt-4" style={{color: "white"}}>
                    Hello, my name is Dominic Digiacomo, and I am a recent graduate of Wake Technical Community College. I am the creator of AI-Giene, a project that began as a personal passion and practice exercise but has since evolved into one of the most sophisticated applications I have developed.
                </p>
                <p className="text-white mt-4" style={{color: "white"}}>
                    AI-Giene utilizes the ChatGPT API, an Express backend, and a MongoDB database to store user interactions and session data. By integrating WebSockets, I have enabled seamless real-time session updates between the backend and my React-Redux front end, ensuring a smooth and dynamic user experience.
                </p>
            </div>
        </div>
    );
}

export default Intro;
