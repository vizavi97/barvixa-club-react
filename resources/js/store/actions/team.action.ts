import {Dispatch} from "react";
import {DispatchEvent} from "../redux";
import axios from "axios";
import {BACKEND_API_URL} from "../../config/app.config";
import {SelectTeamFormInterface} from "../../pages/private/team/CreateTeam";
import {CREATE_TEAM, DELETE_TEAM, GET_TEAMS, LOADING_TEAMS} from "../types/team.types";

export const createTeam = (params: SelectTeamFormInterface, coach_id: string | number) => async (dispatch: Dispatch<DispatchEvent<any>>) => {
    const formData = new FormData();
    Object.entries(params).forEach(
        ([key, value]) => {
            if (key === "preview_img" || key === "section_preview_img") {
                formData.append(key, value[0].file)
            } else {
                formData.append(key, value)
            }
        }
    );
    formData.append("coach_id", String(coach_id))
    await axios.post(`${BACKEND_API_URL}team/create`, formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    )
        .then(resp => {
            dispatch({
                type: CREATE_TEAM,
                payload: {
                    teams: resp.data.teams
                }
            })
        })
        .catch(error => console.log("error", error))
}
export const getTeams = (coach_id: string | number) => async (dispatch: Dispatch<DispatchEvent<any>>) => {
    dispatch({
        type: LOADING_TEAMS,
        payload: {
            loader: true
        }
    })
    await axios.post(`${BACKEND_API_URL}team/get-teams`, {
            coach_id
        }
    )
        .then(resp => {
            dispatch({
                type: GET_TEAMS,
                payload: {
                    teams: resp.data.teams
                }
            })
        })
        .catch(resp => console.log("reso", resp))
        .finally(() =>
            dispatch({
                type: LOADING_TEAMS,
                payload: {
                    loader: false
                }
            }))
}
export const deleteTeam = (team_id: string | number) => async (dispatch: Dispatch<DispatchEvent<any>>) => {
    if (team_id) {
        dispatch({
            type: LOADING_TEAMS,
            payload: {
                loader: true
            }
        })
        await axios.post(`${BACKEND_API_URL}team/delete`, {
                id: team_id
            }
        )
            .then(resp => {
                dispatch({
                    type: DELETE_TEAM,
                    payload: {
                        id: team_id
                    }
                })
            })
            .catch(resp => console.log("reso", resp))
            .finally(() =>
                dispatch({
                    type: LOADING_TEAMS,
                    payload: {
                        loader: false
                    }
                }))
    }
}
