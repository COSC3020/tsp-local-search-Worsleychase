function tsp_ls(distance_matrix) {
    let n = distance_matrix.length;
    if (n <= 1) return 0;
    
    // calculate total route distance
    function getDistance(route) {
        let distance = 0;
        for (let i = 0; i < route.length - 1; i++) {
            distance += distance_matrix[route[i]][route[i + 1]];
        }
        return distance;
    }
    
    // Helper for 2optSwap
    function twoOpt(route, i, k) {
        let newRoute = route.slice(0, i);
        for (let j = k; j >= i; j--) {
            newRoute.push(route[j]);
        }
        newRoute.push(...route.slice(k + 1));
        return newRoute;
    }
    
    // initial random route
    let currentRoute = Array.from({length: n}, (_, i) => i);
    for (let i = n - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [currentRoute[i], currentRoute[j]] = [currentRoute[j], currentRoute[i]];
    }
    
    let bestDistance = getDistance(currentRoute);
    let iterations = 0;
    let badCount = 0;
    const MAX_BAD_COUNT = n * 10; // stop after n*10 iterations without improvement
    const MAX_ITER = n * 100;    // limit on total iterations
    
    while (iterations < MAX_ITER && badCount < MAX_BAD_COUNT) {
        let improved = false;
        
        // make i and k random but different from last iteration
        let i = Math.floor(Math.random() * (n-1));
        let k = i + 1 + Math.floor(Math.random() * (n-i-1));
        
        let newRoute = twoOpt(currentRoute, i, k);
        let newDistance = getDistance(newRoute);
        
        if (newDistance < bestDistance) {
            currentRoute = newRoute;
            bestDistance = newDistance;
            improved = true;
            badCount = 0;
        }
        
        if (!improved) badCount++;
        iterations++;
    }
    
    return bestDistance;
}
