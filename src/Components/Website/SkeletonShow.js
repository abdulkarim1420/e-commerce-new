import Skeleton from "react-loading-skeleton";

export default function SkeletonShow(props) {

    const skeletonLength = Array.from({length : props.length}).map((_, key) =>
        <div className={props.classes}>
            <div className="mx-1">
                <Skeleton key={key} baseColor={props.baseColor} highlightColor={props.highlightColor} height={props.height} width={props.width} />
            </div>
        </div>
    )

    return skeletonLength;
}