library(shiny)

ui <- fluidPage(
  fluidPage(
    duelSelectBoxInput("mychooser", "Available frobs", "Selected frobs",
                       row.names(USArrests), c("A")
    ),
    verbatimTextOutput("selection")
  )
)

server <- function(input, output, session) {
  output$selection <- renderPrint(
    input$mychooser
  )
}

shinyApp(ui, server)
