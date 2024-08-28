import { motion } from "framer-motion";

const AnimationWrapper = ({ children }) => {
    return (
        <motion.div
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            transition={{ type: "tween", duration: 0.5 }}
        >
            {children}
        </motion.div>
    );
}

export default AnimationWrapper;
