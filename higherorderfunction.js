// Create the Movie Dataset
const movies = [
    { title: 'Inception', genre: 'Sci-Fi', year: 2010, rating: 8.8 },
    { title: 'Interstellar', genre: 'Sci-Fi', year: 2014, rating: 8.6 },
    { title: 'The Dark Knight', genre: 'Action', year: 2008, rating: 9.0 },
    { title: 'The Matrix', genre: 'Sci-Fi', year: 1999, rating: 8.7 },
    { title: 'Forrest Gump', genre: 'Drama', year: 1994, rating: 8.8 },
    { title: 'The Shawshank Redemption', genre: 'Drama', year: 1994, rating: 9.3 },
    { title: 'The Godfather', genre: 'Crime', year: 1972, rating: 9.2 },
  ];
  // Filter Movies by Genre
  function filterByGenre(genre) {
    return movies.filter(movie => movie.genre === genre);
  }
  console.log("Filter Movies by Genre");
  console.log(filterByGenre('Sci-Fi'));

  //Create a List of Movie Titles
  function getMovieTitles() {
    return movies.map(movie => movie.title);
  }
  
  console.log("Get Movie Titles");
  console.log(getMovieTitles());

  // Calculate Average Rating
  function calculateAverageRating() {
    const totalRating = movies.reduce((sum, movie) => sum + movie.rating, 0);
    return (totalRating / movies.length).toFixed(2);
  }
  console.log("Calculate Average Rating");
  console.log(`Average Rating: ${calculateAverageRating()}`);

  // Find the Highest-Rated Movie
  function getHighestRatedMovie() {
    return movies.reduce((highest, movie) => (movie.rating > highest.rating ? movie : highest));
  }
  console.log("Get Highest Rated Movie");
  console.log(getHighestRatedMovie());

  // Group Movies by Decade
  function groupByDecade() {
    return movies.reduce((acc, movie) => {
      const decade = Math.floor(movie.year / 10) * 10;
      if (!acc[decade]) acc[decade] = [];
      acc[decade].push(movie);
      return acc;
    }, {});
  }
  console.log("Group Movies by Decade");
  console.log(groupByDecade());

  // Display Movie Titles and Ratings
  function displayMovies() {
    movies.forEach(movie => {
      console.log(`Title: ${movie.title}, Rating: ${movie.rating}`);
    });
  }
  console.log("Display Movie Titles and Ratings");
  displayMovies();

  // Dynamic Sorting by Rating or Year
  function sortByProperty(property) {
    return (a, b) => a[property] > b[property] ? -1 : 1;
  }
  console.log("Dynamic Sorting by Rating or Year");
  console.log(movies.slice().sort(sortByProperty('rating'))); // Sorted by rating
  console.log(movies.slice().sort(sortByProperty('year')));   // Sorted by year

  // Advanced higher order functions
  // Helper functions
    const toUpperCase = str => str.toUpperCase();
    const alphabetize = arr => arr.sort();

    // Advanced Compose function
    const compose = (...fns) => (arg) => fns.reduce((acc, fn) => fn(acc), arg);

    // Combined function: takes movie titles, makes them uppercase, then sorts them
    const getAlphabetizedTitles = compose(
    alphabetize,
    titles => titles.map(toUpperCase)
    );

    const titles = movies.map(movie => movie.title);
    console.log("Combined function: takes movie titles, makes them uppercase, then sorts them");
    console.log(getAlphabetizedTitles(titles));

    //---------------
    // Advanced Currying
    // Curried function to filter by property
    const filterByProperty = (property) => (value) => {
        return movies.filter(movie => movie[property] === value);
    };
    
    const filterByGenre_curry = filterByProperty('genre');
    const sciFiMovies = filterByGenre_curry('Sci-Fi');
    
    console.log("Curried function to filter by property");
    console.log(sciFiMovies);
  
    // Advanced Partial Application
    // Base function to check criteria
    const filterByCriteria = (property, comparison) => (value) => {
        return movies.filter(movie => comparison(movie[property], value));
    };

    // Finds movies with a minimum rating and another that sets a minimum year.
    // Partially applied functions for specific filters
    const minRating = filterByCriteria('rating', (movieRating, threshold) => movieRating >= threshold);
    const minYear = filterByCriteria('year', (movieYear, year) => movieYear >= year);
    
    console.log("Finds movies with a minimum rating and another that sets a minimum year");
    console.log(minRating(8.5)); // Movies with rating >= 8.5
    console.log(minYear(2000));  // Movies from the year 2000 onward
  
    // Advanced Custom Higher-Order Function for Dynamic Filtering
    function filterMovies(criteria) {
        return movies.filter(movie =>
          criteria.every(criterion => criterion(movie))
        );
      }
      
      // Example criteria functions
      const isDrama = movie => movie.genre === 'Drama';
      const hasHighRating = movie => movie.rating >= 9;
      const releasedAfter1991 = movie => movie.year > 1991;
      
      // Filtering with multiple criteria
      const dramaAndHighRatedMovies = filterMovies([isDrama, hasHighRating]);
      const dramaReleasedAfter1991 = filterMovies([isDrama, releasedAfter1991]);
      
      console.log("Takes an array of criteria and returns movies that match all of them");
      console.log(dramaAndHighRatedMovies);
      console.log(dramaReleasedAfter1991);

      // Function Pipelines
      // Processes data by passing it through a series of functions
      const pipeline = (...fns) => (value) =>
        fns.reduce((currentValue, fn) => fn(currentValue), value);
      
      // Pipeline example: Get titles, uppercase, and filter by first letter
      const startsWith = letter => titles => titles.filter(title => title.startsWith(letter));
      
      const processTitles = pipeline(
        titles => titles.map(toUpperCase),
        startsWith('T')  // Filter titles starting with 'T'
      );
      
      console.log("Processes data by passing it through a series of functions");
      console.log(processTitles(titles));

      
      