import React, { useState, useEffect, useContext } from "react";
import { getSeo, updateFBSeo, updateSeo, updateTwitterSeo } from "../../../pages/api/channel-store.api";
import Loader from "../../loader";


function SeoWrapper({ innerNav, user }) {
    const dUMMY = '/img/black_image.jpg'
    const [metaDesc, setMetaDesc] = useState("")
    const [metaKeywords, setMetaKeywords] = useState("")
    const [metaTitle, setMetaTitle] = useState("")
    const [ogDesc, setOgDesc] = useState("")
    const [ogImage, setOgImage] = useState("")
    const [ogTitle, setOgTitle] = useState("")
    const [twitterDesc, settwitterDesc] = useState("")
    const [twitterImage, setTwitterImage] = useState("")
    const [twitterTitle, setTwitterTitle] = useState("")
    const [loader, setLoader] = useState(true);
    const [isupdateSeo, setUpdateSeo] = useState(false);
    const [updatefbSeo, setUpdatefbSeo] = useState(false);
    const [updatetwitSeo, setUpdatetwitSeo] = useState(false);

    const updateState = (data) => {
        setMetaDesc(data['wcfmmp-seo-meta-desc'])
        setMetaKeywords(data['wcfmmp-seo-meta-keywords'])
        setMetaTitle(data['wcfmmp-seo-meta-title'])
        setOgDesc(data['wcfmmp-seo-og-desc'])
        setOgImage(data['wcfmmp-seo-og-image'])
        setOgTitle(data['wcfmmp-seo-twitter-title'])
        settwitterDesc(data['wcfmmp-seo-twitter-title'])
        setTwitterTitle(data['wcfmmp-seo-twitter-title'])
        setTwitterImage(data['wcfmmp-seo-twitter-image'])
    }

    useEffect(() => {
        if (user.id) {
            getSeo(user).then(res => {
                updateState(res.data.data)
                setLoader(false)
            }).catch(() => setLoader(false))
        }
    }, [user])
    const updateStorePolicies = () => {
        const formData = {
            'wcfmmp-seo-meta-desc': metaDesc,
            'wcfmmp-seo-meta-title': metaTitle,
            'wcfmmp-seo-meta-keywords': metaKeywords,
            user_id: user.id
        }
        const formDataFb = {
            'wcfmmp-seo-og-desc': ogDesc,
            'wcfmmp-seo-og-image': ogImage,
            'wcfmmp-seo-og-title': ogTitle,
            user_id: user.id
        }
        const formDatatwit = {
            'wcfmmp-seo-twitter-desc': twitterDesc,
            'wcfmmp-seo-twitter-title': twitterTitle,
            'wcfmmp-seo-twitter-image': twitterImage,
            user_id: user.id
        }
        if (isupdateSeo)
            updateSeo(user, formData).then(() => {
                setUpdateSeo(false)
                alert.success("Store seo updated successfully.", TIMEOUT)
            }).catch(() => setUpdateSeo(false))
        if (updatefbSeo)
            updateFBSeo(user, formDataFb).then(() => {
                setUpdatefbSeo(false)
                alert.success("Store facebook seo updated successfully.", TIMEOUT)
            }).catch(() => setUpdatefbSeo(false))
        if (updatetwitSeo)
            updateTwitterSeo(user, formDatatwit).then(() => {
                setUpdatetwitSeo(false)
                alert.success("Store twitter seo updated successfully.", TIMEOUT)
            }).catch(() => setUpdatetwitSeo(false))
    }
    if (loader) {
        return <div style={{ textAlign: "center" }}><Loader color="primary" /></div>
    }
    return (
        <>
            <h2>General Setup</h2>
            <div className="store-panel">
                <label>SEO Title</label>
                <input type="text" value={metaTitle} onChange={(e) => { setUpdateSeo(true); setMetaTitle(e.target.value) }} />
            </div>
            <div className="store-panel">
                <label>Meta Description</label>
                <input type="text" value={metaDesc} onChange={(e) => { setUpdateSeo(true); setMetaDesc(e.target.value) }} />
            </div>
            <div className="store-panel">
                <label>Meta Keywords</label>
                <input type="text" value={metaKeywords} onChange={(e) => { setMetaKeywords(e.target.value); setUpdateSeo(true); }} />
            </div>

            <h2>Facebook Setup</h2>
            <div className="store-panel">
                <label>Facebook Title</label>
                <input type="text" value={ogTitle} onChange={(e) => { setOgTitle(e.target.value); setUpdatefbSeo(true) }} />
            </div>
            <div className="store-panel">
                <label>Facebook Description</label>
                <input type="text" value={ogDesc} onChange={(e) => { setOgDesc(e.target.value); setUpdatefbSeo(true) }} />
            </div>
            <div className="store-panel">
                <label>Facebook Image</label>
                <div className="logo-tag">
                    <img
                        src={ogImage ? ogImage : dUMMY}
                        alt="image"
                    />
                    {ogImage && <span className="cross-icon">x</span>}
                </div>
            </div>

            <h2>Twitter Setup</h2>
            <div className="store-panel">
                <label>Twitter Title</label>
                <input type="text" value={twitterTitle} onChange={(e) => { setTwitterTitle(e.target.value); setUpdatetwitSeo(true) }} />
            </div>
            <div className="store-panel">
                <label>Twitter Description</label>
                <input type="text" value={twitterDesc} onChange={(e) => { settwitterDesc(e.target.value); setUpdatetwitSeo(true) }} />
            </div>
            <div className="store-panel">
                <label>Twitter Image</label>
                <div className="logo-tag">
                    <img
                        src={twitterImage ? twitterImage : dUMMY}
                        alt="image"
                    />
                    {twitterImage && <span className="cross-icon">x</span>}
                </div>
            </div>
            <div className="button-tab">
                <button onClick={() => updateStorePolicies()}>SAVE</button>
            </div>
        </>
    );
}

export default SeoWrapper;
