import { render } from "@testing-library/react"
import { GifItem } from "../../src/components/GifItem";


describe("Pruebas en <GifItem />", () => {
    const title = 'el título';
    const url = 'http://www.google.com';

    test("Tiene que hacer match con el snapshot", () => {
        const { container } = render(<GifItem title={title} url={url} />);
        expect(container).toMatchSnapshot();
    });
});