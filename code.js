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
    const MAX_BAD_COUNT = n * 10; // stop after n*10 iterations without improvement. I used n*10 because it is unlikely that a better route isn't found in n*10 attempts
    const MAX_ITER = n * 100;    // limit on total iterations. I used n*100 because it needs a substantially large amount of iterations for each attempt to avoid getting stuck in local minima
    
    while (iterations < MAX_ITER && badCount < MAX_BAD_COUNT) {
        let improved = false;
        
        // make i and k random but different from last iteration
        let i = Math.floor(Math.random() * (n-1)); // randomly choose i to be between 0 and n-2. Makes sure local minima can be escaped given sufficient attempts/iterations
        let k = i + 1 + Math.floor(Math.random() * (n-i-1)); // randomly choose k to be between i+1 and n-1. Makes sure k is always greater than i
        
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
