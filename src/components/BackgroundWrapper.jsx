import getBackground from "@/constants/background"

const BackgroundWrapper = ({ children }) => {
    const backgroundPath = getBackground("thu");

    return (
        <div>
            <video autoPlay loop muted onContextMenu={(event) => {
                event.preventDefault();
            }} className="bg-vid">
                <source src={backgroundPath} type="video/webm" />
            </video>
            {children}
        </div>
    )
}

export default BackgroundWrapper
