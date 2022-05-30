import Axios from "axios";
import { useEffect, useState } from "react";
import useRequestWp from "../../hooks/useRequestWp";
import BlockUi, { containerBlockUi } from "../ui/blockui/BlockUi";


const SocialNetworkTab = ({ user }) => {


    const [ blocking, setBlocking ] = useState(true);

    const baseApi = process.env.bossApi;

    const [ values, setValues ] = useState({
        twitter:    {value: '', id: ''},
        instagram:  {value: '', id: ''},
        facebook:   {value: '', id: ''},
        linkedin:   {value: '', id: ''},
        youtube:    {value: '', id: ''},
        twitch:     {value: '', id: ''},
        spotify:    {value: '', id: ''},
    });

    const getDataProfile = ({ source, token, extra }) => {

        return Axios.get(baseApi + '/xprofile/fields', {
            params: {
                user_id: extra,
                profile_group_id: 6,
                fetch_field_data: true
            },
            headers: {
                'Authorization': `Bearer ${token}`
            },
            cancelToken: source.token
        });

    }

    const [dataProfile, error] = useRequestWp(getDataProfile, user?.token, user?.id);


    useEffect(() => {
        if(!dataProfile) return;

        let dataFinale = {};

        dataProfile.map( ({name, data, id}) =>  {
            dataFinale[name.toLowerCase()] = { 
                value: data.value.raw, 
                id
            } 
        });

        setValues({...values,...dataFinale});

        setBlocking(false)
   
    }, [dataProfile])


    const handlerChange = (e) => {

        setValues(values =>{
            return {
                ...values,
                [e.target.name] : {
                    value: e.target.value,
                    id: values[e.target.name].id
                }
            }
        })

    }

    const handlerSubmit = async (e) => {

        e.preventDefault();
        
        let allRequest = [];

        for (const key in values) {

            const url = `${baseApi}/xprofile/${values[key].id}/data/${user.id}`;

            allRequest.push( Axios.patch(url,{ value: values[key].value }, {
                headers:{
                    'Authorization': `Bearer ${user.token}`
                }
            }) );

        }

        setBlocking(true);

        try {

            const res = await Axios.all(allRequest);

            setBlocking(false);
            
        } catch (e) {
            console.log(e);

            setBlocking(false);

        }


    }


    return ( 
        <form
        css={containerBlockUi} 
        onSubmit={ e => handlerSubmit(e)} >
            
            { blocking && <BlockUi color="#eb1e79" /> }
            <div className="form-group">
                <label htmlFor="twitter">Twitter</label>
                <input 
                type="url" 
                className="form-control"
                name="twitter"
                value={values.twitter.value}
                onChange={e => handlerChange(e)}
                id="twitter" />
            </div>
            <div className="form-group">
                <label 
                htmlFor="instagram">Instagram</label>
                <input 
                type="url" 
                className="form-control"
                name="instagram"
                value={values.instagram.value}
                onChange={e => handlerChange(e)}
                id="instagram" />
            </div>
            <div className="form-group">
                <label 
                htmlFor="facebook">Facebook</label>
                <input 
                type="url" 
                className="form-control"
                name="facebook"
                value={values.facebook.value}
                onChange={e => handlerChange(e)}
                id="facebook" />
            </div>
            <div className="form-group">
                <label 
                htmlFor="twitch">Twitch</label>
                <input 
                type="url" 
                className="form-control"
                name="twitch"
                value={values.twitch.value}
                onChange={e => handlerChange(e)}
                id="twitch" />
            </div>
            <div className="form-group">
                <label 
                htmlFor="spotify">Spotify</label>
                <input 
                type="url" 
                className="form-control"
                name="spotify"
                value={values.spotify.value}
                onChange={e => handlerChange(e)}
                id="spotify" />
            </div>
            <div className="form-group">
                <label htmlFor="linkedin">LinkedIn</label>
                <input 
                type="url" 
                className="form-control"
                name="linkedin"
                value={values.linkedin.value}
                onChange={e => handlerChange(e)}
                id="linkedin" />
            </div>
            <div className="form-group">
                <label 
                htmlFor="youtube">Youtube</label>
                <input 
                type="url" 
                className="form-control"
                name="youtube"
                value={values.youtube.value}
                onChange={e => handlerChange(e)}
                id="youtube" />
            </div>
            <div className="form-group mt-4">
                <input className="btn btn-block btn-primary" type="submit" value="update" />
            </div>
        </form>
     );
}
 
export default SocialNetworkTab;