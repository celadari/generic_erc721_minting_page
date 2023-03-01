import styles from "./styles.module.css";
import {useEffect, useState} from "react";

const imgStatusMap = {
    inited: "inited",
    loading: "loading",
    loaded: "loaded",
    error: "error",
}

const defaultJsonData = {
    imgUrl: "",
    name: "",
}

export default function NftCart({tokenId, jsonUriHttp}) {
    const [imgStatus, setImagStatus] = useState(imgStatusMap.loading);
    const [jsonData, setJsonData] = useState(defaultJsonData);

    useEffect( () => {
        async function fetchData() {
            try {
                const jsonRes = await fetch(jsonUriHttp);
                const jsonToken = await jsonRes.json();
                const imageUri = jsonToken.image;
                const imageUriHttp = `${process.env.REACT_APP_IPFS_GATEWAY_URL}/${imageUri.slice(7)}`;

                setJsonData({
                    imgUrl: imageUriHttp,
                    ...jsonToken
                });
                setImagStatus(imgStatusMap.loaded);
            } catch (err) {
                setImagStatus(imgStatusMap.error);
                console.error(`Error happend in NftCart component with: ${err}`);
            }
        }
        fetchData();
    }, [])

    return (
        <div className={styles.card}>
            <div className={styles.imgWrapper}>
                {jsonData.imgUrl ? <img className={styles.img} src={jsonData.imgUrl} /> : "Getting img"}
            </div>
            <div>
                <div>tokenId: {tokenId}</div>
                {jsonData.name ? <div>name: {jsonData.name}</div> : "Getting name"}
            </div>
        </div>
    )

}