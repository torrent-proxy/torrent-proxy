export default interface IProxy {
	proxy(url: string): Promise<any>
}
