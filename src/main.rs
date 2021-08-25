use web_view::*;

fn main() {
    println!("Starting markum...");
    
    web_view::builder()
        .title("Markum")
        .content(Content::Html(include_str!("ui/index.html")))
        .size(1500, 800)
        .resizable(true)
        .debug(true)
        .user_data(())
        .invoke_handler(|_webview, _arg| Ok(()))
        .run()
        .unwrap();
}
