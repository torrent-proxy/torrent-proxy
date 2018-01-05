export default interface IRoute {
    get(...args: any[]): Promise<any>
}
