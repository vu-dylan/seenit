import MovieList from './MovieList'
import AboutMe from './AboutMe.js'
import ReviewList from './ReviewList'
import { useState, useEffect } from 'react'
import database from '../firebase'


const UserPage = (props) => {

    //create list of movie from user's data base
    const [movies, setMovies] = useState([]);

    useEffect(() => 
        database.ref(`users/${props.googleObj.googleId}/movies`).on("value", (snapshot) =>{
            let myMovies = []
            if (snapshot != null){
                snapshot.forEach(data => {
                    let movie = {
                        db_key: data.key,
                        title: data.val().title,
                        poster_path: data.val().img,
                        id: data.val().API_id
                    }
                    myMovies.push(movie)
                })
            }
            //console.log(myMovies[0].key)
            setMovies(myMovies)
        })
    ,[])

    //console.log(movies)
    return(
        <div className="UserPageFlex">
            <div className="user">
                {/* <UserPic /> Disabled this component for now since it is broken*/}
                {/* <img src ="https://i.ytimg.com/vi/4y_lc8m4vSc/hqdefault.jpg" /> */}
                <img className="GooglePic" src = {props.googleObj.imageUrl} alt="Your Profile Icon"/>
                <h3 style={{fontSize: "40px"}}>{props.googleObj.name}</h3>
                {/* <AboutMe /> */}
            </div>
            <div className="UserContent">
                <div className="MyMovies">
                    <MovieList listName = "My Favorite Movies" googleObj = {props.googleObj} movieList = {movies} setAPI_id = {props.setAPI_id}/>
                </div>
                <br/>
                <div className="MyReviews">
                    <ReviewList googleObj={props.googleObj} />
                </div>
            </div>
        </div> 
    )
}

export default UserPage