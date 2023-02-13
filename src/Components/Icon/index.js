import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleLeft, faThumbsUp, faCommentDots, faShareNodes, faFaceSmileWink, faImage, 
    faEllipsisVertical,
    faTrophy,
    faBookOpen,
    faSearch,
    faBell,
    faUser,
    faShuffle,
    faHeart,
    faCirclePlay,
    faCaretDown,
    faCircle,
    faXmark,
    faHouse,
    faCircleXmark,
    faSpinner,
} from '@fortawesome/free-solid-svg-icons';

import {
    faFaceSmile,
    faCircleCheck,
} from '@fortawesome/free-regular-svg-icons';

function HeadingRightIcon({className, onClick}) {
    const props = {
        onClick,
    };
    return (  
        <FontAwesomeIcon icon = {faAngleRight} className={className} {...props}/>
    );
}

function HeadingLeftIcon({className, onClick}) {
    const props = {
        onClick,
    };
    return (  
        <FontAwesomeIcon icon = {faAngleLeft} className={className} {...props}/>
    );
}

function CommentLikeIcon({className, onClick}) {
    const props = {
        onClick,
    };
    return (  
        <FontAwesomeIcon icon = {faThumbsUp} className={className} {...props}/>
    );
}

function CommentCmtDotsIcon({className, onClick}) {
    const props = {
        onClick,
    };
    return (  
        <FontAwesomeIcon icon = {faCommentDots} className={className} {...props}/>
    );
}

function CommentShareIcon({className, onClick}) {
    const props = {
        onClick,
    };
    return (  
        <FontAwesomeIcon icon = {faShareNodes} className={className} {...props}/>
    );
}

function CommentEmojiIcon({className, onClick}) {
    const props = {
        onClick,
    };
    return (  
        <FontAwesomeIcon icon = {faFaceSmileWink} className={className} {...props}/>
    );
}

function CommentAddImageIcon({className, onClick}) {
    const props = {
        onClick,
    };
    return (  
        <FontAwesomeIcon icon = {faImage} className={className} {...props}/>
    );
}

function CommentArrowDownIcon({className, onClick}) {
    const props = {
        onClick,
    };
    return (  
        <FontAwesomeIcon icon = {faCaretDown} className={className} {...props}/>
    );
}

function EllipsisVerticalIcon({className, onClick}) {
    const props = {
        onClick,
    };
    return (  
        <FontAwesomeIcon icon = {faEllipsisVertical} className={className} {...props}/>
    );
}

function TroPhyIcon({className, onClick}) {
    const props = {
        onClick,
    };
    return (  
        <FontAwesomeIcon icon = {faTrophy} className={className} {...props}/>
    );
}

function BookOpenIcon({className, onClick}) {
    const props = {
        onClick,
    };
    return (  
        <FontAwesomeIcon icon = {faBookOpen} className={className} {...props}/>
    );
}

function SearchIcon({className, onClick}) {
    const props = {
        onClick,
    };
    return (  
        <FontAwesomeIcon icon = {faSearch} className={className} {...props}/>
    );
}


function BellIcon({className, onClick}) {
    const props = {
        onClick,
    };
    return (  
        <FontAwesomeIcon icon = {faBell} className={className} {...props}/>
    );
}

function UserIcon({className, onClick}) {
    const props = {
        onClick,
    };
    return (  
        <FontAwesomeIcon icon = {faUser} className={className} {...props}/>
    );
}

function ShuffleIcon({className, onClick}) {
    const props = {
        onClick,
    };
    return (  
        <FontAwesomeIcon icon = {faShuffle} className={className} {...props}/>
    );
}

function FaceSmileIcon({className, onClick}) {
    const props = {
        onClick,
    };
    return (  
        <FontAwesomeIcon icon = {faFaceSmile} className={className} {...props}/>
    );
}

function HeartIcon({className, onClick}) {
    const props = {
        onClick,
    };
    return (  
        <FontAwesomeIcon icon = {faHeart} className={className} {...props}/>
    );
}

function PlayIcon({className, onClick}) {
    const props = {
        onClick,
    };
    return (  
        <FontAwesomeIcon icon = {faCirclePlay} className={className} {...props}/>
    );
}

function CaretDownIcon({className, onClick}) {
    const props = {
        onClick,
    };
    return (  
        <FontAwesomeIcon icon = {faCaretDown} className={className} {...props}/>
    );
}

function DotCircleIcon({className, onClick}) {
    const props = {
        onClick,
    };
    return (  
        <FontAwesomeIcon icon = {faCircle} className={className} {...props}/>
    );
}

function CircleCheckIcon({className, onClick}) {
    const props = {
        onClick,
    };
    return (  
        <FontAwesomeIcon icon = {faCircleCheck} className={className} {...props}/>
    );
}

function AngleRightIcon({className, onClick}) {
    const props = {
        onClick,
    };
    return (  
        <FontAwesomeIcon icon = {faAngleRight} className={className} {...props}/>
    );
}

function AngleLeftIcon({className, onClick}) {
    const props = {
        onClick,
    };
    return (  
        <FontAwesomeIcon icon = {faAngleLeft} className={className} {...props}/>
    );
}

function XmarkIcon({className, onClick}) {
    const props = {
        onClick,
    };
    return (  
        <FontAwesomeIcon icon = {faXmark} className={className} {...props}/>
    );
}

function HouseIcon({className, onClick}) {
    const props = {
        onClick,
    };
    return (  
        <FontAwesomeIcon icon = {faHouse} className={className} {...props}/>
    );
}

function CircleXmarkIcon({className, onClick}) {
    const props = {
        onClick,
    };
    return (  
        <FontAwesomeIcon icon = {faCircleXmark} className={className} {...props}/>
    );
}

function SpinnerIcon({className, onClick}) {
    const props = {
        onClick,
    };
    return (  
        <FontAwesomeIcon icon = {faSpinner} className={className} {...props}/>
    );
}


export { 
    HeadingLeftIcon, 
    HeadingRightIcon,
    CommentLikeIcon,
    CommentCmtDotsIcon,
    CommentShareIcon,
    CommentEmojiIcon,
    CommentAddImageIcon,
    CommentArrowDownIcon,
    EllipsisVerticalIcon,
    TroPhyIcon,
    BookOpenIcon,
    SearchIcon,
    BellIcon,
    UserIcon,
    ShuffleIcon,
    FaceSmileIcon,
    HeartIcon,
    PlayIcon,
    CaretDownIcon,
    DotCircleIcon,
    CircleCheckIcon,
    AngleRightIcon,
    AngleLeftIcon,
    XmarkIcon,
    HouseIcon,
    CircleXmarkIcon,
    SpinnerIcon,
};