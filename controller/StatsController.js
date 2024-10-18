const statsService = require('../service/StatsService')


const getDashboardStats = async (req, res) => {
    try {
        const [sessionsCount, reservationsCount, clientsCount, adminsCount, moviesCount] = await Promise.all([
            statsService.getSessionsCount(),
            statsService.getReservationsCount(),
            statsService.getClientsCount(),
            statsService.getAdminsCount(),
            statsService.getMoviesCount()
        ]);

        res.status(200).json({
            success: true,
            data: {
                sessionsCount,
                reservationsCount,
                clientsCount,
                adminsCount,
                moviesCount
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching dashboard stats: ' + error.message
        });
    }
};

module.exports = {
    getDashboardStats
}