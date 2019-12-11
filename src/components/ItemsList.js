import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import ElementCard from './ElementCard'
import ItemDetails from './ItemDetails'
import { CardDeck, Modal, ModalHeader } from 'reactstrap'
import { UNSELECT_ITEM, SELECT_ITEM, SELECT_SAVED_ITEM } from '../redux/actions/itemActions';
export default function ItemsList() {

  const [itemsList, setItemsList] = useState([]);
  const [reloader] = useState(0);
  const [index, setIndex] = useState(0);
  const [modal, setModal] = useState(false);
  const [isLoading, setLoading] = useState(false);


  const selectedItem = useSelector(state => state.itemReducers.selectedItem);
  const savedItems = useSelector(state => state.itemReducers.savedItems);
  const dispatcher = useDispatch();

  useEffect(() => {
    axios.get("https://pokeapi.co/api/v2/item")
      .then(res => setItemsList(res.data.results))
  }, [reloader])

  window.onscroll = (() => {
    if (isLoading) return;
    if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
      loadItems();
    }
  });

  const modalToggle = async (e) => {
    if (!modal)
      await getItemDetails(e.props.id);
    else
      dispatcher({ type: UNSELECT_ITEM })
    setModal(!modal);
  }

  const getItemDetails = async (itemId) => {
    const checkIfSaved = savedItems.filter(item => item.id === itemId)
    if (checkIfSaved[0] === undefined) {
      dispatcher({ type: SELECT_ITEM, payload: { selectedItem: await fetchDetails(itemId) } })
    } else {
      dispatcher({ type: SELECT_SAVED_ITEM, payload: { id: itemId } })
    }
  }

  const fetchDetails = async (itemId) => {
    var response
    var itemAttributes = [];

    await axios.get("https://pokeapi.co/api/v2/item/" + itemId)
      .then(res => {
        response = res.data;
        for (let i = 0; i < response.attributes.length; i++) {
          itemAttributes.push(response.attributes[i].name);
        }
      })

    return {
      id: itemId,
      name: response.name,
      cost: response.cost,
      description: response.effect_entries[0].effect,
      attributes: itemAttributes,
      imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/" + response.name + ".png"
    }
  }


  const itemsCards = itemsList.map((item, index) => {
    return (
      <ElementCard id={index + 1} key={index + 1} name={item.name} onClick={modalToggle}
        img={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/" + item.name + ".png"} />
    )
  })

  const loadItems = async () => {
    setLoading(true);
    const newIndex = index + 20;
    setIndex(newIndex);
    const res = await axios.get("https://pokeapi.co/api/v2/item/?offset=" + newIndex + "&limit=20")
    setItemsList([...itemsList, ...res.data.results])
    setLoading(false);
  }

  return (
    <div className="container mt-2">
      <CardDeck className="justify-content-center">
        {itemsCards}
      </CardDeck>

      <Modal isOpen={modal} toggle={modalToggle}>
        <ModalHeader className="text-uppercase" toggle={modalToggle}>
          <b>{selectedItem.name}</b>
        </ModalHeader>
        {modal &&
          <ItemDetails selectedItem={selectedItem} />
        }
      </Modal>
    </div >
  );
}
