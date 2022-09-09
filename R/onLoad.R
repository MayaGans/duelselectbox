.onLoad <- function(...) {
  shiny::registerInputHandler("duelselectbox.chooser", function(data, ...) {
    if (is.null(data))
      NULL
    else
      list(left=as.character(data$left), right=as.character(data$right))
  }, force = TRUE)
}
