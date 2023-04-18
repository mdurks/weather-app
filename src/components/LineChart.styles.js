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
        max-width: 1040px;
        overflow: visible;
        cursor: pointer;
        -webkit-tap-highlight-color: transparent;

        text {
            font-size: 12px;
            font-weight: bold;
            pointer-events: none;
        }
    }
`

export const Heading = styled.h2`
    margin: 20px 0;
    font-size: 25px;
    word-break: break-word;

    ${mediaQuery.min_tablet} {
        margin: 0 0 20px;
        font-size: 35px;
    }

    span {
        display: inline-block;
    }
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
`

