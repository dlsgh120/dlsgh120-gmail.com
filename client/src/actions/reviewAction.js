import {NEW_REVIEW, FETCH_REVIEW, REVIEW_INIT, DELETE_REVIEW, ALL_DELETE_REVIEWS} from './types';

//review post

export const createReview = (reviewData) => dispatch =>{
    fetch('/api/reviews',{
        method:'POST',
        headers:{
            'content-type':'application/json'
        },
        body: JSON.stringify(reviewData)
    })
    .then(res => res.json())
    .then(reviews => reviews.reviews)
    .then(review => dispatch({
        type: NEW_REVIEW,
        payload: review
    }));
}

// board를 read 할때 boardId 에 대한 모든 review를 fetch
export const fetchReview = id => dispatch =>{
    fetch('/api/reviews/boardId/'+id)
    .then(res=> res.json())
    .then(reviews => reviews.reviews)
    .then(review => dispatch({
        type: FETCH_REVIEW,
        payload: review
    }));
}

export const reviewInit = () =>{
    return {
        type: REVIEW_INIT
    };
};

export const deleteReview = (id) => dispatch =>{
    fetch('/api/reviews/'+id,{
        method:'DELETE'
    }).then(res=>res.json())
      .then(reviews => dispatch({
         type: DELETE_REVIEW,
         payload: id
      }));
}

//board를 delete할때 boardId에 대한 모든 review를 delete
export const allDeleteReview = (id) => dispatch =>{
    fetch('/api/reviews/boardId/'+id,{
        method:'DELETE'
    }).then(res=>res.json())
      .then(reviews => dispatch({
          type: ALL_DELETE_REVIEWS,
          payload: id
      }))
};