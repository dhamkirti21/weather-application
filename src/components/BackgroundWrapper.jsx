import getBackground from "@/constants/background"
import { useSelector } from "react-redux";

const BackgroundWrapper = ({ children }) => {
    const mode = useSelector((state) => state.mode);
    let backgroundPath = getBackground(mode);

    return (
        <div >
            <video key={backgroundPath} autoPlay loop muted onContextMenu={(event) => {
                event.preventDefault();
            }} className="bg-vid">
                <source src={backgroundPath} type="video/webm" />
            </video>
            {children}
        </div>
    )
}

export default BackgroundWrapper
