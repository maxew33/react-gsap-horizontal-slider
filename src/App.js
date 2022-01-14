import React, { useState, useEffect, Fragment } from 'react'
import { gsap } from 'gsap'
import { Draggable } from 'gsap/all'
import { v4 as uuidv4 } from 'uuid'

import './App.css';

import SlideContact from './components/SlideContact';
import SlideHome from './components/SlideHome';
import SlideSkills from './components/SlideSkills';
import SlideWork from './components/SlideWork';

function App() {

  const [mySlide, setMySlide] = useState(0)
  const [wheel, setWheel] = useState(false)
  const [offsets, setOffsets] = useState([])

  const size = useWindowSize()

  const mySlideContent = [
    {
      name: 'accueil',
      slideDisplayed: <SlideHome />,
      id: uuidv4()
    },
    {
      name: 'portfolio',
      slideDisplayed: <SlideWork />,
      id: uuidv4()
    },
    {
      name: 'compétences',
      slideDisplayed: <SlideSkills />,
      id: uuidv4()
    },
    {
      name: 'contact',
      slideDisplayed: <SlideContact />,
      id: uuidv4()
    }

  ]

  let dur = 0.75,
    slides,
    oldSlide,
    iw = size.width

  gsap.registerPlugin(Draggable)

  useEffect(() => {
    console.log(`
 ____              _                  
|  _ \\            (_)                 
| |_) | ___  _ __  _  ___  _   _ _ __ 
|  _ < / _ \\| '_ \\| |/ _ \\| | | | '__|
| |_) | (_) | | | | | (_) | |_| | |   
|____/ \\___/|_| |_| |\\___/ \\__,_|_|
                 _/ |                 
                |__/               `)

    slides = [...document.querySelectorAll(".slide-wrapper")]


    // Add event listener
    window.addEventListener("resize", ()=>slideAnim(mySlide))
    // Call handler right away so state gets updated with initial window size
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", slideAnim)


    // function sizeIt() {

    //   setOffsets([])

    //   console.log(offsets)

    //   iw = window.innerWidth

    //   console.log(iw)
    //   let tempOffset = []

    //   for (let i = 0; i < slides.length; i++) {
    //     tempOffset.push(-slides[i].offsetLeft)
    //   }

    //   setWindowSize({
    //     width: window.innerWidth,
    //     height: window.innerHeight
    //   })

    //   console.log('width', windowSize.width, 'height', windowSize.height)

    //   setOffsets(tempOffset)
    // }

    // sizeIt()

    // window.addEventListener("resize", sizeIt)

    // return () => window.removeEventListener("resize", sizeIt)

  }, [])

  useEffect(() => {

    // change the page by dragging it

    Draggable.create(".slide-container", {
      type: "x",
      bounds: '.App',
      onDragEnd: function dragging() {
        let deltaX = Math.abs(Math.abs(this.startX) - Math.abs(this.endX))
        let direction = Math.sign(this.startX - this.endX) // '-' => right, '+' => left
        deltaX > iw * .2 ? slideAnim(direction) : slideAnim(0)
      }
    })

  }, [mySlide])

  function slideAnim(direction) {

    console.log(size.width)

    oldSlide = mySlide
    oldSlide += direction

    console.log(oldSlide, direction, oldSlide*(size.width/4))

    // oldSlide < 0 && (oldSlide = mySlide)
    // oldSlide > (offsets.length - 1) && (oldSlide = mySlide)

    // check if i can move or not
    if (oldSlide < 0 || oldSlide > 3) { (oldSlide = mySlide) }

    setMySlide(oldSlide)

    console.log(oldSlide, oldSlide*(size.width/4))

    // gsap.to('.slide-container', dur, { x: offsets[oldSlide] })

    gsap.to('.slide-container', dur, { x: -oldSlide*size.width })
  }

  // changing the slide using the wheel
  const handleWheel = (e) => {
    if (wheel) {
      console.log('not now')
    }
    if (!wheel) {
      setWheel(true)

      setTimeout(() => {
        setWheel(false)
      }, 500);

      let direction = e.deltaY > 0 ? 1 : -1

      slideAnim(direction)
    }
  }

  // changig the slide by clicking on the slide wanted
  const handleClick = (e) => {
    console.log('click', e.target, e.target.dataset.index)
    console.log(e.target.dataset.index - mySlide)
    slideAnim(e.target.dataset.index - mySlide)
  }


  return (
    <div className="App">

      <div className="arrow" data-direction="left" onClick={() => slideAnim(-1)}>
        &#8592;
      </div>
      <div className="arrow" data-direction="right" onClick={() => slideAnim(1)}>
        &#8594;
      </div>
      <div className='banner'>
        banner{mySlide + 1}
        <ul className='navbar'>
          {mySlideContent.map((item, index) => {
            return (
              <li className='nav-items' key={item.id} data-index={index} onClick={handleClick}>
                - {item.name} &nbsp;
              </li>
            )
          })}
        </ul>
      </div>
      <div className="slide-container" onWheel={handleWheel}>
        {mySlideContent.map((item) => {
          return (
            <Fragment key={item.id}>
              {item.slideDisplayed}
            </Fragment>
          )
        })}
        {/* <SlideHome />
        <SlideWork />
        <SlideSkills />
        <SlideContact /> */}
      </div>

    </div>
  )
}


// custom hook for window size and resizing
function useWindowSize(){
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  })

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    // Add event listener
    window.addEventListener("resize", handleResize)
    // Call handler right away so state gets updated with initial window size
    handleResize()
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize)
  }, [])
  return windowSize;
}

export default App;
