import React from "react";
import ContentLoader from "react-content-loader";
const fakeArray = [...Array(8)];

const MyLoader = (props) => {
    return (fakeArray
        .map((item, index) => (
            <ContentLoader
                className="skeleton"
                key={index}
                speed={2}
                width="100%"
                height={200}
                viewBox="0 0 150 187"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
                {...props}
            >
                <rect x="0" y="-1" rx="10" ry="10" width="150" height="91" />
                <rect x="0" y="99" rx="5" ry="5" width="150" height="15" />
                <rect x="0" y="120" rx="5" ry="5" width="93" height="15" />
                <rect x="0" y="161" rx="5" ry="5" width="80" height="24" />
                <rect x="115" y="151" rx="5" ry="5" width="32" height="32" />
            </ContentLoader>
        ))
    )
}

export default MyLoader