# Kanban DnD

This is a Kanban board that support drag-and-drop!

![ToyPChqYXu](https://user-images.githubusercontent.com/719938/150536916-7d8719ca-bdea-4dfe-b68a-c41c1f0cc640.gif)

## Mobile Friendly

![mlIbYKu0IU](https://user-images.githubusercontent.com/719938/150601282-b8d196b4-64c3-4f38-a952-02344c9618f3.gif)

## Required features

- [x] React
- [x] Built with SPA (Single Page Application)
- [x] Boilerplate, UI Kit can be customized according to your preference.

### Model: Column

- [x] Required fields: Name, Order

### Model: Card

- [x] Required fields: Name, Description, Created date, Status(Open, Closed), Order

### User Stories

- [x] User can add column with name
- [x] User can modify column name
- [x] User can delete empty column
- [x] User can move columns by drag & drop
- [x] User can add card to column with name and description
- [x] User can modify card details
- [x] User can identify / switch status of card
- [x] User can move / order card by drag & drop
- [x] User can archive card

## Advanced features

- [ ] Test codes
- [ ] Graceful error handling

### Structure

- [x] Multiple boards
- [ ] More fields such as author, labels, assignee, comments, protected
- [x] i18n feature

### PWA

- [ ] Add to Homescreen with an icon
- [x] Persistent storage (by any method) to preserve state after refresh
- [x] Push notification when a new card created

### Performance

- [ ] Windowing list (react-window, react-virtualized) when rendering lots of cards
- [x] Code splitting and lazy loading

### Design

- [x] RWD(Responsive Web Design) for desktop/mobile
- [x] Show description when list is empty
- [x] 404 Page if url is not valid

### UX

- [ ] Auto focus on initial state
- [ ] Input Validation
