import styles from "./NewsDetail.module.scss";
import clsx from "clsx";
import { Fragment, useState } from "react";
// components
import Button from "../../Components/Button";
import Heading from "../../Components/Heading";
import { CommentLikeIcon, CommentCmtDotsIcon, CommentShareIcon, CommentAddImageIcon, CommentEmojiIcon, CommentArrowDownIcon } from "../../Components/Icon";
import SidebarPage from "../Components/SidebarPage";
import ItemNews from "../../Components/ItemNews";
import Comment from "../Components/Comment";
export default function NewsDetail() {    
    let category = "Anime";
    return (
        <Fragment>
            <section className={clsx(styles.wrapper)}>                      
               {/* content */}
               <div className={clsx(styles.contentWrap)}>
                    <div className={clsx(styles.article)}>
                        <Heading primary>Tuyển tập Genshin Impact - Strolling Beneath a Moon Awaiting Spring</Heading>
                        <p className={clsx(styles.articleDate)}>Thời gian đăng: 27/12/2022</p>
                        {
                            category === "Anime" ? 
                                <p className={clsx(styles.articleCategory, styles.animeCate)}>Thể loại: thông tin</p>
                            : category === "Info" ?
                                <p className={clsx(styles.articleCategory, styles.infoCate)}>Thể loại: thông tin</p>
                            : category === "Manga" ?
                                <p className={clsx(styles.articleCategory, styles.mangaCate)}>Thể loại: thông tin</p>
                            : ""
                        }
                        
                        <div className={clsx(styles.articleImgWrapper)}>
                            <img className={clsx(styles.articleImg)} src="https://s199.imacdn.com/ta/2022/12/22/4aad4c69a6d9d6a9_ffcd5eaeb7c4801e_5966216717215802769722.jpg" alt="" />                            
                        </div>
                        <p className={clsx(styles.articleDesc)}>
                        There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. 
                        If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, 
                        making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. 
                        The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.
                        </p>

                        <p className={clsx(styles.articleDesc)}>
                        There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. 
                        If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, 
                        making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. 
                        The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.
                        </p>

                        <p className={clsx(styles.articleDesc)}>
                        There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. 
                        If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, 
                        making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. 
                        The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.
                        </p>

                        <p className={clsx(styles.articleDesc)}>
                        There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. 
                        If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, 
                        making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. 
                        The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.
                        </p>

                        <p className={clsx(styles.articleDesc)}>
                        There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. 
                        If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, 
                        making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. 
                        The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.
                        </p>

                        <p className={clsx(styles.articleDesc)}>
                        There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. 
                        If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, 
                        making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. 
                        The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.
                        </p>

                        <Heading primary>Bình luận</Heading>
                        <Comment/>                                                
                        
                    </div>

                    <div className={clsx(styles.sidebarWrap)}>
                        <SidebarPage type="recommend" title="Có thể bạn sẽ thích" />
                    </div>                      
               </div>
               
                
                
            </section>            
        </Fragment>
    )
}