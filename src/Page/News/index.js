import styles from "./News.module.scss";
import clsx from "clsx";
import { Fragment } from "react";
import Button from "../../Components/Button";
import Heading from "../../Components/Heading";
import Navigation from "../Components/Navigation";

import SidebarPage from "../Components/SidebarPage";
import ItemNews from "../../Components/ItemNews";
export default function News() {
    return (
        <Fragment>
            <section className={clsx(styles.wrapper)}>                      
               {/* content */}
               <div className={clsx(styles.contentWrap)}>
                    <header className={clsx(styles.headerContent)}>
                        <Heading active>Tin mới nhất</Heading>
                        <nav className={clsx(styles.category)}>
                            <Button primary active>Mới nhất</Button>
                            <Button primary>Anime</Button>
                            <Button primary>Truyện tranh</Button>
                            <Button primary>Thông tin</Button>
                        </nav>
                    </header>
                    <div className={clsx(styles.content)}>
                        <ItemNews href="https://genshin.hoyoverse.com/vi/news"/>
                        <ItemNews setCategory={"anime"}/>
                        <ItemNews setCategory={"manga"}/>
                        <ItemNews/>
                        <ItemNews/>
                        <ItemNews/>
                        <ItemNews/>
                        <ItemNews/>
                        <ItemNews/>                        
                    </div>
                    <div className={clsx(styles.viewMore)}>            
                        <Navigation icon="left" />
                        <Navigation active>1</Navigation>
                        <Navigation>2</Navigation>
                        <Navigation>3</Navigation>
                        <Navigation>4</Navigation>
                        <Navigation>5</Navigation>
                        <Navigation icon="right" />                
                    </div> 
               </div>
               

                <div className={clsx(styles.sidebarWrap)}>
                    <SidebarPage type="news" title="Tin vừa xem" subTitle="Tin được theo dõi nhiều"/>
                </div> 
                
            </section>            
        </Fragment>
    )
}