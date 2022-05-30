import Axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import usePatchRequest from "../../hooks/usePatchRequest";
import useRequestWp from "../../hooks/useRequestWp";
import BlockUi, { containerBlockUi } from "../ui/blockui/BlockUi";

const TabBasicCommunity = ({ id }) => {

    const baseApi = process.env.bossApi;
    

    const [blocking, setBlocking] = useState(true);

    const [ options, setOptions ] = useState([]);

    const [ url, setUrl ] = useState('')

    const [form, setForm] = useState({
        "name": "",
        "description": "",
        "status": "public",
        "types": ""
    })

    const [formError, setFormError] = useState(false);

    const { user } = useContext(UserContext)

    const  getTypeCommunity = ({source, token}) => {
        return Axios.get( baseApi + '/groups/types',{
            headers: {
                'Authorization': `Bearer ${token}` 
            },
            cancelToken: source.token
        })
    }

    const  getCommunity = ({source, token, extra}) => {

        return Axios.get( `${baseApi}/groups/${extra[0]}` ,{
            headers: {
                'Authorization': `Bearer ${token}` 
            },
            cancelToken: source.token
        })
    }
    
    const [ typeCommunity, error ]  = useRequestWp(getTypeCommunity, user?.token);

    const [ community, errorCommunity ]  = useRequestWp(getCommunity, user?.token, id);

    const [
        updateData,
        updateComunnity,
        UpdateError ] = usePatchRequest(`${baseApi}/groups/${url}`, form, {
            headers: {
                'Authorization': `Bearer ${user?.token}` 
            }
        })

    if(updateData){
        console.log(updateData);
    }


    const handlerChange = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        })
    }

    const handlerSubmit = (e)=>{
        e.preventDefault();

        setFormError(false);
        setBlocking(true);

        if(!form.name){
            setFormError(true);
            setBlocking(false);
            return;
        }

        updateComunnity();

        setFormError(false);
        setBlocking(false);

    }

    useEffect(() => {
        if(!community) return;

        setBlocking(false)

        const editData =  {
            "name": community.name,
            "description": community.description.raw,
            "status": community.status,
            "types": community.types[0]
        }

        setForm({
            ...form,
            ...editData
        })
        

    }, [community])

    useEffect(() => {
        if(!typeCommunity) return;

        setOptions(typeCommunity)


    }, [typeCommunity])

    useEffect(() => {

        if(!user) return;
        if(!id) return;

        setUrl(id[0])

        setForm({
            ...form,
            "creator_id" : user.id
        })

    }, [user, id])

    return ( 
        <form 
        css={containerBlockUi}
        onSubmit={ e => handlerSubmit( e )}
        >
            { blocking && <BlockUi color="#eb1e79" /> }
            <div className="form-group">
                <label htmlFor="name">Community Name (required)</label>
                <input  
                className={`form-control ${ formError ?  'is-invalid' : ''}` }
                type="text" 
                name="name"
                onChange={ e => handlerChange(e) }
                value={ form.name }
                id="name"/>
                <div className="invalid-feedback">
                    Community Name is <b>Required</b> 
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="description">Community Description</label>
                <textarea  
                className="form-control" 
                type="text" 
                name="description" 
                onChange={ e => handlerChange(e) }
                value={ form.description }
                id="description"/>
            </div>
            <h3 className="mb-3 mt-3">Privacy Options</h3>
            <div className="form-group">
                <div className="custom-control custom-checkbox mb-3">
                    <input
                        className="custom-control-input"
                        id="public"
                        type="checkbox"
                        name="status"
                        value="public"
                        checked={ form.status === "public" }
                        onChange={ e => handlerChange(e) }
                    />
                    <label className="custom-control-label" htmlFor="public">
                        <b>This is a public community</b>
                    </label>
                </div>

                <div className="custom-control custom-checkbox mb-3">
                    <input
                        className="custom-control-input"
                        id="private"
                        type="checkbox"
                        name="status"
                        checked={ form.status === "private" }
                        value="private"
                        onChange={e => handlerChange(e)}
                    />
                    <label className="custom-control-label" htmlFor="private">
                        <b>This is a private community</b>
                    </label>
                </div>

                <div className="custom-control custom-checkbox mb-3">
                    <input
                        className="custom-control-input"
                        id="hidden"
                        type="checkbox"
                        name="status"
                        value="hidden"
                        checked={ form.status === "hidden" }
                        onChange={e => handlerChange(e)}
                    />
                    <label className="custom-control-label" htmlFor="hidden">
                        <b>This is a hidden community</b>
                    </label>
                </div>
            </div>
            <h3 className="mb-3 mt-3">Community Type</h3>
            <div className="form-group">
                <label htmlFor="last_name">
                    What type of comunnity is this? (optional)
                </label>
                <select
                className="form-control"
                name="types"
                onChange={e => handlerChange(e)}
                value={form.types}
                id="gender">
                    <option value="">Select Type Community</option>
                    {options.map(option =>(
                        <option key={option.directory_slug} value={option.directory_slug}>
                            {option.labels.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="form-group mt-5">
                <input className="btn btn-block btn-primary" type="submit" value="Create Community"/>
            </div>
        </form>
     );
}
 
export default TabBasicCommunity;