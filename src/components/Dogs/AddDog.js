import React, {useEffect, useState} from 'react';
import {Cookies} from "react-cookie";
import {getUserInfo, addDog} from "../../Functions";

function AddDog(props) {
    const [allowToAdd, setAllowToAdd] = useState(false)
    const [name, setName] = useState('')
    const [breed, setBreed] = useState('')
    const [height, setHeight] = useState('')
    const [weight, setWeight] = useState('')
    const [birthday, setBirthday] = useState('')
    // const [image, setImage] = useState('')

    const [owner, setOwner] = useState('')

    let cookies = new Cookies()

    useEffect(() => {
      async function fetchData() {
        if (cookies.get('myToken')) {
            getUserInfo(cookies.get("myToken")).then((data) => {
                setOwner(data.id)
                setAllowToAdd(true)
            })
        }
      }

      fetchData().catch(err => {
          alert("some error occurred "+ err)
      })

    }, [allowToAdd])

    // const maxNumber = 1;
    // const onChange = (imageList, addUpdateIndex) => {
    //     // data for submit
    //     console.log(imageList, addUpdateIndex);
    //     setImage(imageList[0]);
    // };

    const addDogBtn =()=>{
       // add image once it works again
        console.log(owner)
       addDog(cookies.get("myToken"), name, breed, height,weight, birthday, owner).catch(err => {
           alert("something went wrong "+ err)
       });
    }




    return (
        <div>
        {
            allowToAdd ? (
                <div>
            <h1>Add Dog</h1>
            <div className="mb-3">
                <label htmlFor={"title"} className={"form-label"}>Name</label>
                <input type={"text"} className={"form-control"} id={"name"}
                       value={name} onChange={e => setName(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label htmlFor={"breed"} className={"form-label"}>Breed</label>
                <input type={"text"} className={"form-control"} id={"breed"}
                       value={breed} onChange={e => setBreed(e.target.value)}
                />
            </div>
                    <div className="mb-3">
                <label htmlFor={"height"} className={"form-label"}>Height</label>
                <input type={"text"} className={"form-control"} id={"height"}
                       value={height} onChange={e => setHeight(e.target.value)}
                />
            </div>
                    <div className="mb-3">
                <label htmlFor={"weight"} className={"form-label"}>Weight</label>
                <input type={"text"} className={"form-control"} id={"weight"}
                       value={weight} onChange={e => setWeight(e.target.value)}
                />
            </div>



            <div className="mb-3">
                <label htmlFor={"birthday"} className={"form-label"}>Birthday</label>
                <input type={"date"} className={"form-control"} id={"birthday"}
                       value={birthday} onChange={e => setBirthday(e.target.value)}
                />
            </div>
            {/*<div className="mb-3">*/}
            {/*    <label htmlFor={"description"} className={"form-label"}>Image</label>*/}
            {/*    <input type={"text"} className={"form-control"} id={"description"}*/}
            {/*           value={description} onChange={e => setDescription(e.target.value)}*/}
            {/*    />*/}
            {/*</div>*/}
        <button className={"btn btn-primary"} onClick={addDogBtn}>Add</button>
        </div>
            ):(<div>You are not allowed to use this page</div>)
        }
        </div>
    );
}

export default AddDog;