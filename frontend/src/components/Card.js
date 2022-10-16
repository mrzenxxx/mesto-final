import React, { useState, useEffect } from 'react';
import currentUserContext from "../contexts/CurrentUserContext"

const Card = (props) => {
    const currentUser = React.useContext(currentUserContext);// подписываем его на CurrentUserContext и получаем значение контекста.

    const [isLiked, setIsLiked] = useState(false);
    const [isOwn, setIsOwn] = useState(false);

    useEffect(() => {
        setIsLiked(props.card.likes.includes(currentUser._id))
        setIsOwn(props.card.owner._id === currentUser._id)
    }, [currentUser._id, props.card])


    // Определяем, являемся ли мы владельцем текущей карточки

    // Создаём переменную, которую после зададим в `className` для кнопки удаления
    const cardDeleteButtonClassName = (
        `element__button element__button_action_del${isOwn ? '' : ' card__delete-button_hidden'}`
    );

    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем

    // Создаём переменную, которую после зададим в `className` для кнопки лайка
    const cardLikeButtonClassName = `element__button element__button_clicked${isLiked ? ' is_user_like' : ''}`;

    function handleCardClick(){
        props.onCardClick(props.card)
  }

    function handleCardLike(){
        props.onCardLike(props.card._id, isLiked)
  }
    function handleCardDelete(){
        props.onCardDelete(props.card)
  }

    return (
        <div className="element">
            <img className="element__image" src={props.card.link} alt={props.card.name}
                 onClick={handleCardClick}/>
            <div className="element__text">
                <h2 className="element__title">{props.card.name}</h2>
                <div className="element__like-group">
                    <button className={cardLikeButtonClassName}
                            aria-label="Мне нравится"//Теперь нужно добавить пропс onCardLike для компонента Card и задать в него эту функцию
                            type="button" onClick={handleCardLike}/>
                    <p className="element__like-counter">{props.card.likes.length}</p>
                </div>
                <button type="button" className={cardDeleteButtonClassName}
                        title="Удалить"
                        onClick={handleCardDelete}/>
            </div>
        </div>
    )
}

export default Card