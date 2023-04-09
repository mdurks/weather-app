import styled from "styled-components"
import { mediaQuery } from "../utilities/mediaQueries"

export const SelectedDayInfoWrapper = styled.div`
    width: 100%;
    max-width: 1040px;
    margin: auto;
    padding: 0 0 20px;
    text-align: center;

    ${mediaQuery.min_tablet} {
        padding: 0 20px 20px;
    }
`

export const ContentWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;

    ${mediaQuery.min_tablet} {
        flex-wrap: none;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
    }

    svg {
        margin: 50px 0;

        ${mediaQuery.min_tablet} {
            margin: -70px 15px 60px;
        }
    }
`

export const DetailsWrapper = styled.div`
    flex: 1 1 calc(50% - 6px);
    margin: 3px;
    background: #ffffff14;
    border-radius: 10px;

    ${mediaQuery.min_tablet} {
        flex: auto;
        padding: 20px 0 0;
    }
`

export const SvgWrapper = styled.div`
    flex: 1 1 calc(50% - 6px);
    margin: 3px;
    background: #ffffff14;
    border-radius: 10px;

    ${mediaQuery.min_tablet} {
        flex: auto;
        padding: 100px 0px 0px;
    }
`

export const DetailsItem = styled.p`
    margin-bottom: 0;
    font-size: 45px;
    font-weight: bold;

    ${mediaQuery.min_tablet} {
        margin-bottom: 40px;
    }
`

export const DetailsLabel = styled.p`
    font-size: 20px;
    font-weight: bold;
`