export const links = {
    auth: {
        register: "/auth/register",
        login: "/auth/login",
        logout: "/auth/logout",
        refreshToken: "/auth/refresh-access-token",
    },
    problem:{
        getProblems: "/problems/",
        getSingleProblem: (id: string) => `/problems/${id}`,
        getSampleTestcases: (id: string) => `/problems/${id}/testcases`,
        createProblem: "/problems/",
        deleteProblem: (id: string) => `/problems/${id}`,
        addTestCase: (problemId: string) => `/problems/${problemId}/testcases`,
        // updateProblem: (id: string) => `/problems/${id}`,
    },
    submission:{
        submitCode: "/submissions/submit",
        runCode: "/submissions/run",
    },
    user: {
        getStatistics: "/user/profile-stats",
        getRecentSubmissions: "/user/recent-submissions",
        getLeaderboard: "/user/leaderboard"
    }
}