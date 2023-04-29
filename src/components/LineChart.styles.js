import styled from "styled-components"
import { mediaQuery } from "../utilities/mediaQueries"
import { motion } from "framer-motion";

export const LineChartWrapper = styled.div`
    width: 100%;
    margin: 0 auto;
    padding: 0px;
    text-align: center;

    ${mediaQuery.min_tablet} {
        padding: 20px;
    }

    svg {
        margin: 5px 0 15px;
        max-width: 1040px;
        overflow: visible;
        -webkit-tap-highlight-color: transparent;

        ${mediaQuery.min_tablet} {
            margin: 0;
        }

        text {
            font-size: 12px;
            font-weight: bold;
            pointer-events: none;
        }
    }
`

export const Heading = styled.h2`
    margin: 5px 0 20px;
    font-size: 20px;
    word-break: break-word;

    ${mediaQuery.min_tablet} {
        margin: 0 0 20px;
        font-size: 35px;
    }
`

export const HeadingItem = styled.span`
    display: inline-block;
    color: ${props => props.color ? props.color : "white"};
`

export const Tooltip = styled(motion.div)`
    margin: 0 0 10px;
    padding: 15px 26px 18px;
    width: 100%;
    border-radius: 10px;
    background: #0064a7;
    text-align: left;
    font-weight: bold;

    ${mediaQuery.min_tablet} {
        position: absolute;
        width: 216px;
        margin: 0;
        padding: 15px 26px 18px;
        border-radius: 20px;
        z-index: 10;
        pointer-events: none;
    }

    p {
        display: flex;
        justify-content: space-between;
        margin: 7px 0;
    }

    small {
        display: block;
        text-align: center;
        font-weight: normal;
    }
`

