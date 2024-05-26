import React, { ReactNode } from "react";

interface IWrapperProps {
	children: ReactNode;
}

const Wrapper: React.FC<IWrapperProps> = ({ children }) => {
	return <div className="wrapper">{children}</div>;
};

export default Wrapper;
