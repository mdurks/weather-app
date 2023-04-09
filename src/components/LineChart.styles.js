import styled from "styled-components"
import { mediaQuery } from "../utilities/mediaQueries"

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

        text {
            font-size: 12px;
            font-weight: bold;
        }
    }
`

export const Heading = styled.h2`
    margin: 20px 0;
    font-size: 25px;

    ${mediaQuery.min_tablet} {
        margin: 0 0 20px;
        font-size: 35px;
    }
`

