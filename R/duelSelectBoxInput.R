#' duel select input with drag and drop
#'
#' @param inputId id of chooser input
#' @param leftLabel label for left hand side
#' @param rightLabel label for right hand side
#' @param leftChoices options for left hand side
#' @param rightChoices options for right hand side
#'
#' @return shiny widget input
#' @export
duelSelectBoxInput <- function(inputId,
                         leftLabel,
                         rightLabel,
                         leftChoices,
                         rightChoices) {

  leftChoices <- purrr::map(leftChoices,
                            ~tags$div(.x, class="chooser-item")
                            )
  rightChoices <- purrr::map(rightChoices, ~
                               tags$div(
                                 .x, class="chooser-item",
                                 tags$i(class="fas fa-arrows-alt-v handler"))
                             )

  html <- tagList(
    div(id=inputId, class="chooser",
        div(class="chooser-container chooser-left-container",
            tags$label(leftLabel, class="chooser-label"),
            div(class="chooser-arrow",
                div(class="icon all-right-arrow", icon("angle-double-right")),
                div(class="icon right-arrow", icon("angle-right")),
            ),
            tags$div(class="select left", leftChoices)
        ),
        div(class="chooser-container chooser-right-container",
            tags$label(rightLabel, class="chooser-label"),
            div(class="chooser-arrow",
                div(class="icon left-arrow", icon("angle-left")),
                div(class="icon all-left-arrow", icon("angle-double-left"))
            ),
            tags$div(class="select right", rightChoices)
        )
    ),
  tags$script("new Sortable(document.querySelectorAll('.right')[0], {
    handle: '.handler', // handle's class
    animation: 150
    });")
  )

  deps <- htmltools::htmlDependency(
    name = "duelselectbox",
    version = "1.0.0",
    src = "duelselectbox",
    script = c("js/chooser-binding.js", "js/sortable.min.js"),
    stylesheet = c("css/duelselectbox.css"),
    package = "duelselectbox"
  )

  return(list(html, deps))

}
