import React from 'react';
import clsx from "clsx";
import { Fragment, useEffect, useState } from "react";
import styles from "./Test.module.scss";
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';

const DATA = [
    {
        img: "https://gamek.mediacdn.vn/133514250583805952/2022/4/6/be1-164922643669587606129.jpg"
    },
    {
        img: "https://gamek.mediacdn.vn/133514250583805952/2022/4/6/be1-164922643669587606129.jpg"
    },
    {
        img: "https://gamek.mediacdn.vn/133514250583805952/2022/4/6/be1-164922643669587606129.jpg"
    },
    {
        img: "https://gamek.mediacdn.vn/133514250583805952/2022/4/6/be1-164922643669587606129.jpg"
    },
    {
        img: "https://gamek.mediacdn.vn/133514250583805952/2022/4/6/be1-164922643669587606129.jpg"
    },
]
function Test() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/posts`)
            .then(res => res.json())
            .then(res => {
                setData(res)
                console.log(res)
                // console.log("success")
            })

            .catch(() => {
                console.log("error")
            })
    }, []);

    gsap.registerPlugin(ScrollTrigger);
    useEffect(() => {
        const component = document.querySelectorAll("#index")
        const container = document.querySelector("#slider")
        gsap.to(container, {
            xPercent: -100 * (component.length - 1),
            ease: "none",
            scrollTrigger: {
                trigger: container,
                pin: true,
                start: "top",
                scrub: 1,
                snap: 1 / (component.length - 1),
            }
        })
    }, [])

    return (
        <Fragment>
            {/* {data.map((item, index) => {
                // console.log(index)
                // console.log(item)
                return (
                    <div className={clsx(styles.item)} key={index}>
                        <h2>Title: {item.title}</h2>
                        <p>Body: {item.body}</p>
                    </div>
                )
            })}*/}

            <div className={clsx(styles.container)}>
                <div className={clsx(styles.slider)}
                    id="slider"
                    onScroll={() => { console.log("hêlo") }}
                >
                    {DATA.map((item, index) => {
                        return (
                            <div id="index" className={clsx(styles.item)} key={index}>
                                {/* hello */}
                                <img src={item.img} alt=""/>
                            </div>
                        )
                    })}                    
                </div>
            </div>

        </Fragment>
    );
}

export default Test;