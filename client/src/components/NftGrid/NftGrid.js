import {useCallback, useState} from "react";
import NftCard from "../NftCard/NftCard";
import styles from "./styles.module.css";

const defaultNftCount = 6;

export default function NftGrid({ nftDataArr }) {
    const min = Math.min(nftDataArr.length, defaultNftCount);
    const [imgCount, setImgCount] = useState(min);

    const loadMoreClick = useCallback(() => {
        setImgCount(Math.min(imgCount + defaultNftCount, nftDataArr.length));
    }, [imgCount, nftDataArr]);

    return (
        <div>
            <div className={styles.nftGridContainer}>
                {nftDataArr.slice(0, imgCount).map((nftData) => {
                    return <NftCard key={nftData.tokenId} {...nftData} />
                })}
            </div>

            <button onClick={loadMoreClick}>Load More</button>
        </div>
    );
}