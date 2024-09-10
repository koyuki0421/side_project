export default function Tabs({ children, buttons, ButtonsContainer = 'menu' }) {
  // const ButtonsContainer = buttonsContainer;
  return (
    <>
      <ButtonsContainer>{buttons}</ButtonsContainer>
      {children}
    </>
  );
}

// 如果要用自訂的componentu(例Section)去寫預設值要這樣寫：ButtonsContainer = Section
// 若要用其他元素，並不是自訂的component就寫：ButtonsContainer = 'menu'或是ButtonsContainer = 'div'等